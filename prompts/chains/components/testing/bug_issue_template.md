---
name: Bug Issue Template
about: Template for creating bug issues from test failures
title: "[BUG] {test_name} - {failure_type}"
labels: bug, test-failure, {test_type}
assignees: {assigned_team}
priority: {priority_level}
sprint: {sprint_number}
---

# Bug Issue: {test_name}

## Issue Details
- **Issue ID**: {auto_generated_id}
- **Test Type**: {test_type}
- **Priority**: {priority_level}
- **Status**: {status}
- **Created Date**: {timestamp}
- **Sprint**: {sprint_number}
- **Assignee**: {assigned_team}

## Test Failure Information
### Location
- **File Path**: `{file_path}`
- **Function/Class**: `{function_name}`
- **Line Number**: {line_number}

### Error Details
```
{error_message}
```

### Stack Trace
```
{stack_trace}
```

## Impact Analysis
- **Severity**: {severity_level}
- **Affected Components**:
  {affected_components_list}
- **Dependencies Affected**: {yes/no}
  {dependency_list}

## Reproduction Steps
1. {step_1}
2. {step_2}
3. {step_3}

## Expected Behavior
{description_of_expected_behavior}

## Actual Behavior
{description_of_actual_behavior}

## Test Environment
- **OS**: {os_version}
- **Browser/Runtime**: {environment_details}
- **Dependencies**: {relevant_dependency_versions}

## Related Information
### Code Coverage
- **Current Coverage**: {coverage_percentage}
- **Affected Lines**: {line_numbers}

### Related Files
{list_of_related_files}

### TODO Items
- [ ] Create unit test for {function_name}
- [ ] Fix failing test
- [ ] Update documentation
- [ ] Add regression test

## Additional Context
{additional_notes_or_context}

## Resolution Plan
1. **Investigation**:
   - [ ] Analyze error logs
   - [ ] Review related test cases
   - [ ] Check dependency versions

2. **Implementation**:
   - [ ] Create fix branch
   - [ ] Implement solution
   - [ ] Add/update tests

3. **Validation**:
   - [ ] Run test suite
   - [ ] Verify fix
   - [ ] Update documentation

## Review Checklist
- [ ] Code changes reviewed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Coverage maintained/improved
- [ ] No new issues introduced

---
> Generated by Neo SDLC Manager
> Test Failure Detection System
> {timestamp}
