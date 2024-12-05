# Neo Prompts System

## Overview
This directory contains the prompt chain system that powers Neo's development process orchestration. The prompts are organized into specialized components that work together to manage different aspects of the software development lifecycle.

## Prompt Chain Architecture

### Components
1. **Development Components**
   - Project scaffolding
   - Code generation
   - Testing automation
   - Documentation generation
   - Performance monitoring
   - Security validation

2. **Planning Components**
   - Requirements analysis
   - Feature decomposition
   - Sprint planning
   - Story generation

3. **Quality Components**
   - Code quality assessment
   - Test coverage analysis
   - Security scanning
   - Performance testing

## Product Management Components

### Business Analysis Chain
1. **BRD Generation**
   - Business context analysis
   - Stakeholder requirements
   - Market validation
   - Success criteria definition
   - Validation metrics

2. **Product Requirements Chain**
   - Feature specifications
   - Technical requirements
   - Acceptance criteria
   - Implementation guidelines
   - Validation rules

3. **Feature Journey Chain**
   - User flow mapping
   - Interaction points
   - Experience validation
   - Error handling
   - Success metrics

4. **Business Generation Chain**
   - Business model development
   - Market analysis
   - Strategy documentation
   - Risk assessment
   - Validation criteria

5. **Business Ontology Chain**
   - Domain concept modeling
   - Business rule definition
   - Semantic relationship mapping
   - Process documentation
   - Consistency validation

### Integration Points

#### With Development Process
- Feature specifications → Development planning
- Technical requirements → Architecture design
- User flows → UI/UX development
- Business rules → System implementation

#### With Quality Assurance
- Requirements validation
- Market analysis verification
- Strategy assessment
- Domain model consistency

### Workflow Management

#### Command Structure
```bash
# Initialize product management
#product-init

# Generate documentation
#gen-brd    # Business Requirements
#gen-prd    # Product Requirements
#gen-journey # Feature Journey Map
#gen-business # Business Model
#gen-ontology # Business Ontology
```

#### State Management
- Version tracking
- Validation status
- Approval workflows
- Change management

#### Error Handling
- Input validation
- Consistency checks
- Recovery procedures
- Documentation updates

### Best Practices
1. **Requirements Management**
   - Clear documentation
   - Regular validation
   - Stakeholder approval
   - Version control

2. **Product Definition**
   - Feature completeness
   - Technical accuracy
   - User focus
   - Implementation feasibility

3. **Business Modeling**
   - Market alignment
   - Strategy validation
   - Risk mitigation
   - Performance metrics

4. **Domain Modeling**
   - Concept clarity
   - Rule consistency
   - Relationship accuracy
   - Process documentation

## Directory Structure

### /chains
- Components of the prompt chain system
- Specialized processing units
- Integration points
- Workflow definitions

### /components
1. **Development**
   - Project setup
   - Code generation
   - Testing
   - Documentation

2. **Code Quality**
   - Analysis tools
   - Testing frameworks
   - Performance monitoring
   - Security scanning

3. **Research**
   - Requirements analysis
   - Feature planning
   - Technical research
   - Impact analysis

## Usage Guidelines

### Command Structure
- `#dev-init`: Initialize development environment
- `#test-init`: Setup testing framework
- `#test-scan`: Analyze test coverage
- Additional specialized commands per component

### Best Practices
1. **Chain Management**
   - Follow proper initialization sequence
   - Validate prerequisites
   - Handle errors gracefully
   - Maintain state consistency

2. **Development Process**
   - Use appropriate commands
   - Follow workflow sequence
   - Validate outputs
   - Document changes

3. **Quality Assurance**
   - Run all test levels
   - Monitor performance
   - Check security
   - Validate compliance

## Integration Points

### With Neo Core
- Command processing
- State management
- Error handling
- Progress tracking

### With External Systems
- Version control
- CI/CD pipelines
- Testing frameworks
- Documentation systems

## Contributing
1. Follow the prompt chain architecture
2. Maintain component isolation
3. Document integration points
4. Test thoroughly
5. Update documentation
