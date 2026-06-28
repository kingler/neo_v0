#!/bin/bash

echo "Checking prompt chain workflow template loading..."

# Base directories
TEMPLATES_DIR="prompts/core/templates"
CHAINS_DIR="prompts/chains/components"
WORKFLOW_DIR="prompt_versions"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $2"
        return 0
    else
        echo -e "${RED}✗${NC} Missing: $2"
        return 1
    fi
}

# Function to extract dependencies from a file
extract_dependencies() {
    local file=$1
    grep -o 'template[^>]*>[^<]*\|requires[^>]*>[^<]*' "$file" 2>/dev/null | \
    sed 's/.*>\([^<]*\).*/\1/' | \
    grep -v '^[[:space:]]*$'
}

echo -e "\n${YELLOW}1. Checking Core Templates${NC}"
missing_templates=0
total_templates=0
for template in "$TEMPLATES_DIR"/*.{md,xml}; do
    if [ -f "$template" ]; then
        ((total_templates++))
        check_file "$template" "$(basename "$template")"
    fi
done
echo "Total templates found: $total_templates"

echo -e "\n${YELLOW}2. Validating Chain Dependencies${NC}"
for chain_type in orchestration development design documentation requirements sprint testing; do
    echo -e "\nChecking $chain_type chains:"
    if [ -d "$CHAINS_DIR/$chain_type" ]; then
        for chain in "$CHAINS_DIR/$chain_type"/*.{xml,md}; do
            if [ -f "$chain" ]; then
                echo -e "\nAnalyzing chain: $(basename "$chain")"
                while IFS= read -r dep; do
                    if [ ! -z "$dep" ]; then
                        if [[ "$dep" == *"/"* ]]; then
                            check_file "$dep" "Dependency: $dep"
                        else
                            check_file "$TEMPLATES_DIR/$dep" "Template: $dep"
                        fi
                    fi
                done < <(extract_dependencies "$chain")
            fi
        done
    else
        echo -e "${RED}✗${NC} Missing chain directory: $chain_type"
    fi
done

echo -e "\n${YELLOW}3. Validating Workflow Configurations${NC}"
# Check orchestrator
ORCHESTRATOR="prompts/chains/components/orchestration/prompt-chain-orchestrator.xml"
if check_file "$ORCHESTRATOR" "Orchestrator configuration"; then
    echo -e "\nAnalyzing orchestrator chains:"
    while IFS= read -r chain; do
        if [ ! -z "$chain" ]; then
            echo "Checking chain: $chain"
            while IFS= read -r dep; do
                if [ ! -z "$dep" ]; then
                    check_file "$TEMPLATES_DIR/$dep" "Required template: $dep"
                fi
            done < <(extract_dependencies "$ORCHESTRATOR")
        fi
    done < <(grep -o 'chain id="[^"]*"' "$ORCHESTRATOR" 2>/dev/null | cut -d'"' -f2)
fi

echo -e "\n${YELLOW}4. Checking Workflow Integration${NC}"
for version in "$WORKFLOW_DIR"/version-*.yaml; do
    if [ -f "$version" ]; then
        echo -e "\nAnalyzing workflow version: $(basename "$version")"
        # Check prompt types
        while IFS= read -r type; do
            if [ ! -z "$type" ]; then
                echo "Checking prompt type: $type"
                while IFS= read -r template; do
                    if [ ! -z "$template" ]; then
                        if [[ "$template" == *"/"* ]]; then
                            check_file "$template" "Template path: $template"
                        else
                            check_file "$TEMPLATES_DIR/$template" "Template: $template"
                        fi
                    fi
                done < <(grep -o '\.md\|\.txt\|\.xml' "$version" 2>/dev/null)
            fi
        done < <(grep -o 'prompt_types:.*' "$version" 2>/dev/null)
    fi
done

echo -e "\n${YELLOW}5. Checking Template Cross-References${NC}"
for template in "$TEMPLATES_DIR"/*.{md,xml}; do
    if [ -f "$template" ]; then
        echo -e "\nAnalyzing template: $(basename "$template")"
        while IFS= read -r ref; do
            if [ ! -z "$ref" ]; then
                if [[ "$ref" == *"/"* ]]; then
                    check_file "$ref" "Cross-reference: $ref"
                else
                    check_file "$TEMPLATES_DIR/$ref" "Referenced template: $ref"
                fi
            fi
        done < <(grep -o 'reference[^>]*>[^<]*\|include[^>]*>[^<]*' "$template" 2>/dev/null | sed 's/.*>\([^<]*\).*/\1/')
    fi
done

echo -e "\n${YELLOW}Summary of Issues:${NC}"
echo "1. Missing templates: $missing_templates"
echo "2. Template reference inconsistencies detected"
echo "3. Chain dependency issues found"
echo "4. Cross-reference problems identified"

echo -e "\n${YELLOW}Recommendations:${NC}"
echo "1. Create missing templates in $TEMPLATES_DIR"
echo "2. Standardize template references across chain files"
echo "3. Update chain dependency declarations"
echo "4. Fix cross-reference paths"

echo -e "\n${GREEN}Template loading check complete.${NC}" 