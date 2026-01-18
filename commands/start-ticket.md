---
name: start-ticket
description: Start working on a Jira ticket through the full development pipeline
---

# /dev-pipeline:start-ticket

Processes a ticket through the entire development pipeline automatically.

## Usage

```
/dev-pipeline:start-ticket PROJ-123
/dev-pipeline:start-ticket PROJ-123 --skip-design
/dev-pipeline:start-ticket PROJ-123 --dry-run
```

## Arguments

- `TICKET_ID` (required) - The Jira ticket ID (e.g., PROJ-123)

## Options

- `--skip-design` - Skip UI design phase (use existing designs)
- `--skip-qa` - Skip QA phase (not recommended)
- `--dry-run` - Show what would happen without executing
- `--from-phase PHASE` - Start from a specific phase (design, planning, dev, review, qa, deploy)

## Pipeline Phases

### Phase 1: Product Management

**Agent:** @product-manager

Actions:
1. Fetch ticket details from Jira
2. Verify acceptance criteria are clear
3. Confirm story points assigned
4. Check dependencies resolved
5. Move to "In Progress"

Output: Refined ticket with clear requirements

### Phase 2: UI Design

**Agent:** @ui-designer

Actions:
1. Read acceptance criteria
2. Design component hierarchy
3. Create wireframes (ASCII art)
4. Define design tokens
5. Document accessibility requirements

Output: `docs/designs/{ticket-id}/`

### Phase 3: Technical Planning

**Agent:** @tech-architect

Actions:
1. Analyze codebase for patterns
2. Design solution architecture
3. Create API contracts
4. Break down into subtasks
5. Estimate complexity

Output: `docs/tech-specs/{ticket-id}/`

### Phase 4: Development

**Agent:** @developer

Actions:
1. Create feature branch
2. Implement subtasks in order
3. Write unit tests
4. Commit with semantic messages
5. Push to remote

Output: Code on feature branch

### Phase 5: Code Review

**Agent:** @code-reviewer

Actions:
1. Review all changes
2. Check for security issues
3. Verify TypeScript strict
4. Check accessibility
5. Run automated checks

Output: `docs/reviews/{ticket-id}/review.md`

### Phase 6: QA Testing

**Agent:** @qa-engineer

Actions:
1. Manual testing with Chrome Extension
2. Create E2E tests with Playwright
3. Verify all acceptance criteria
4. Test responsive design
5. Generate evidence (screenshots, GIFs)

Output: `tests/e2e/{ticket-id}/`

### Phase 7: Deployment

**Agent:** @devops-engineer

Actions:
1. Run pre-deployment checks
2. Create Pull Request
3. Deploy to staging (preview)
4. Run health checks
5. Deploy to production
6. Update Jira to Done
7. Notify Slack

Output: Production deployment

## Progress Tracking

During execution, progress is tracked and displayed:

```
Pipeline: PROJ-123
=====================================
[x] Product Management  (2m 15s)
[x] UI Design           (5m 30s)
[x] Technical Planning  (4m 45s)
[>] Development         (in progress...)
[ ] Code Review
[ ] QA Testing
[ ] Deployment
=====================================
Current: Implementing subtask 3/5
ETA: ~15 minutes remaining
```

## Handling Failures

If any phase fails:

1. Pipeline pauses
2. Error details shown
3. Options presented:
   - Fix and retry
   - Skip phase (if allowed)
   - Abort pipeline

Example:
```
Phase 'QA Testing' failed!
Error: 3 tests failed

Options:
1. View failed tests
2. Return to @developer for fixes
3. Skip QA (not recommended)
4. Abort pipeline

>
```

## Output

### Success

```json
{
  "ticketId": "PROJ-123",
  "status": "completed",
  "phases": {
    "productManagement": {"status": "completed", "duration": "2m 15s"},
    "uiDesign": {"status": "completed", "duration": "5m 30s"},
    "technicalPlanning": {"status": "completed", "duration": "4m 45s"},
    "development": {"status": "completed", "duration": "25m 10s"},
    "codeReview": {"status": "completed", "duration": "3m 20s"},
    "qaTesting": {"status": "completed", "duration": "8m 45s"},
    "deployment": {"status": "completed", "duration": "3m 15s"}
  },
  "totalDuration": "52m 50s",
  "artifacts": {
    "designs": "docs/designs/PROJ-123/",
    "techSpecs": "docs/tech-specs/PROJ-123/",
    "tests": "tests/e2e/PROJ-123/",
    "pr": "https://github.com/org/repo/pull/42"
  },
  "deployment": {
    "staging": "https://proj-123-preview.vercel.app",
    "production": "https://myapp.vercel.app"
  }
}
```

### Failure

```json
{
  "ticketId": "PROJ-123",
  "status": "failed",
  "failedPhase": "qaTesting",
  "error": "3 E2E tests failed",
  "completedPhases": ["productManagement", "uiDesign", "technicalPlanning", "development", "codeReview"],
  "recommendation": "Review failed tests and fix issues before retrying"
}
```

## Resume After Failure

If a pipeline fails, you can resume from the last phase:

```
/dev-pipeline:start-ticket PROJ-123 --from-phase qa
```

## Examples

### Basic usage
```
/dev-pipeline:start-ticket PROJ-123
```

### Skip design (using existing designs)
```
/dev-pipeline:start-ticket PROJ-123 --skip-design
```

### Preview without executing
```
/dev-pipeline:start-ticket PROJ-123 --dry-run
```

### Resume from QA
```
/dev-pipeline:start-ticket PROJ-123 --from-phase qa
```
