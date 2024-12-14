#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Define finding categories
const FINDING_CATEGORIES = {
  SECURITY: 'security',
  PERFORMANCE: 'performance',
  CODE_QUALITY: 'code_quality',
  DOCUMENTATION: 'documentation',
  TESTING: 'testing',
  ARCHITECTURE: 'architecture',
  UI_UX: 'ui_ux',
  ACCESSIBILITY: 'accessibility',
  OTHER: 'other'
};

// Regular expressions for finding patterns in audit report
const FINDING_PATTERNS = {
  // Match headings with severity indicators
  heading: /^#+\s*(?:\[(Critical|High|Medium|Low)\])?\s*(.+)$/m,
  // Match code blocks
  codeBlock: /```[\s\S]*?```/g,
  // Match bullet points
  bulletPoint: /^\s*[-*]\s+(.+)$/m,
};

/**
 * Parse severity from heading
 * @param {string} heading - The heading text
 * @returns {string} - Severity level
 */
function parseSeverity(heading) {
  const match = heading.match(/\[(Critical|High|Medium|Low)\]/);
  return match ? match[1].toLowerCase() : 'medium';
}

/**
 * Categorize finding based on content
 * @param {string} content - The finding content
 * @returns {string} - Category from FINDING_CATEGORIES
 */
function categorizeContent(content) {
  const contentLower = content.toLowerCase();
  
  // Define category keywords
  const categoryKeywords = {
    [FINDING_CATEGORIES.SECURITY]: ['security', 'vulnerability', 'auth', 'permission', 'csrf', 'xss'],
    [FINDING_CATEGORIES.PERFORMANCE]: ['performance', 'optimization', 'slow', 'latency', 'memory'],
    [FINDING_CATEGORIES.CODE_QUALITY]: ['code quality', 'maintainability', 'technical debt', 'refactor'],
    [FINDING_CATEGORIES.DOCUMENTATION]: ['documentation', 'docs', 'comments', 'readme'],
    [FINDING_CATEGORIES.TESTING]: ['test', 'coverage', 'unit test', 'integration test'],
    [FINDING_CATEGORIES.ARCHITECTURE]: ['architecture', 'design pattern', 'structure', 'dependency'],
    [FINDING_CATEGORIES.UI_UX]: ['ui', 'ux', 'user interface', 'user experience', 'design'],
    [FINDING_CATEGORIES.ACCESSIBILITY]: ['accessibility', 'a11y', 'wcag', 'aria']
  };

  // Find matching category based on keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => contentLower.includes(keyword))) {
      return category;
    }
  }

  return FINDING_CATEGORIES.OTHER;
}

/**
 * Parse audit report content and extract findings
 * @param {string} content - The audit report content
 * @returns {Array} - Array of parsed findings
 */
function parseAuditContent(content) {
  const findings = [];
  const sections = content.split(/^#+\s/m).filter(Boolean);

  for (const section of sections) {
    const lines = section.split('\n');
    const heading = lines[0];
    const content = lines.slice(1).join('\n').trim();

    if (!heading || !content) continue;

    const severity = parseSeverity(heading);
    const category = categorizeContent(content);
    const title = heading.replace(/\[.*?\]/, '').trim();

    // Extract bullet points as recommendations
    const recommendations = [];
    content.split('\n').forEach(line => {
      const bulletMatch = line.match(FINDING_PATTERNS.bulletPoint);
      if (bulletMatch) {
        recommendations.push(bulletMatch[1].trim());
      }
    });

    // Extract code examples
    const codeExamples = content.match(FINDING_PATTERNS.codeBlock) || [];

    findings.push({
      title,
      severity,
      category,
      description: content.replace(FINDING_PATTERNS.codeBlock, '').trim(),
      recommendations,
      codeExamples: codeExamples.map(code => code.replace(/```/g, '').trim()),
      timestamp: new Date().toISOString()
    });
  }

  return findings;
}

/**
 * Validate the JSON structure of findings
 * @param {Array} findings - Array of parsed findings
 * @returns {boolean} - True if valid, throws error if invalid
 */
function validateFindings(findings) {
  const requiredFields = ['title', 'severity', 'category', 'description'];
  
  if (!Array.isArray(findings)) {
    throw new Error('Findings must be an array');
  }

  findings.forEach((finding, index) => {
    requiredFields.forEach(field => {
      if (!finding[field]) {
        throw new Error(`Finding at index ${index} is missing required field: ${field}`);
      }
    });

    if (!Object.values(FINDING_CATEGORIES).includes(finding.category)) {
      throw new Error(`Finding at index ${index} has invalid category: ${finding.category}`);
    }
  });

  return true;
}

/**
 * Main function to parse audit report
 */
async function main() {
  try {
    // Parse command line arguments
    const argv = yargs(hideBin(process.argv))
      .option('input', {
        alias: 'i',
        description: 'Input audit report file path',
        type: 'string',
        demandOption: true
      })
      .option('output', {
        alias: 'o',
        description: 'Output JSON file path',
        type: 'string',
        demandOption: true
      })
      .help()
      .argv;

    // Read input file
    const content = await fs.readFile(argv.input, 'utf8');
    
    // Parse findings
    const findings = parseAuditContent(content);
    
    // Validate findings
    validateFindings(findings);

    // Generate statistics
    const statistics = {
      totalFindings: findings.length,
      bySeverity: findings.reduce((acc, finding) => {
        acc[finding.severity] = (acc[finding.severity] || 0) + 1;
        return acc;
      }, {}),
      byCategory: findings.reduce((acc, finding) => {
        acc[finding.category] = (acc[finding.category] || 0) + 1;
        return acc;
      }, {})
    };

    // Prepare output
    const output = {
      metadata: {
        generatedAt: new Date().toISOString(),
        sourceFile: argv.input,
        version: '1.0'
      },
      statistics,
      findings
    };

    // Ensure output directory exists
    await fs.mkdir(path.dirname(argv.output), { recursive: true });

    // Write output file
    await fs.writeFile(argv.output, JSON.stringify(output, null, 2));
    
    console.log(`Successfully parsed ${findings.length} findings`);
    console.log(`Output written to: ${argv.output}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  parseAuditContent,
  validateFindings,
  FINDING_CATEGORIES
}; 