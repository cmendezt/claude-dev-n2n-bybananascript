---
name: run-pipeline
description: |
  Executes the full development pipeline for a ticket.
  Orchestrates all agents through the development lifecycle.
---

# Run Pipeline Skill

This skill orchestrates the full development pipeline for a ticket.

## When to Use

- Processing a Jira ticket through all phases
- Automating the development workflow
- Running specific pipeline phases

## Pipeline Phases

1. **Product Management** - Refine and validate ticket
2. **UI Design** - Create design specifications
3. **Technical Planning** - Create implementation plan
4. **Development** - Implement the feature
5. **Code Review** - Review code quality
6. **QA Testing** - Test functionality
7. **Deployment** - Deploy to production

## Parameters

- `ticketId` - Jira ticket ID (required)
- `skipPhases` - Array of phases to skip (optional)
- `startFrom` - Phase to start from (optional)
- `dryRun` - Preview without executing (optional)

## Process

### Phase Orchestration

```
For each phase in pipeline:
  1. Log phase start
  2. Invoke corresponding agent
  3. Wait for agent completion
  4. Validate phase output
  5. Handle errors if any
  6. Log phase completion
  7. Proceed to next phase
```

### Error Handling

```
If phase fails:
  1. Log error details
  2. Present options to user:
     - Retry phase
     - Skip phase (if allowed)
     - Return to previous phase
     - Abort pipeline
  3. Wait for user decision
  4. Execute decision
```

### Progress Tracking

Track and display:
- Current phase
- Phase progress (for multi-step phases)
- Time elapsed per phase
- Estimated time remaining
- Artifacts created

## Agent Invocation

### Product Manager
```
Use @product-manager agent:
- Fetch ticket from Jira
- Validate acceptance criteria
- Confirm ready for development
```

### UI Designer
```
Use @ui-designer agent:
- Read acceptance criteria
- Create component specifications
- Generate wireframes
- Define design tokens
```

### Tech Architect
```
Use @tech-architect agent:
- Analyze codebase
- Create implementation plan
- Define API contracts
- Break into subtasks
```

### Developer
```
Use @developer agent:
- Create feature branch
- Implement subtasks
- Write tests
- Commit changes
```

### Code Reviewer
```
Use @code-reviewer agent:
- Review all changes
- Check security
- Check accessibility
- Generate review report
```

### QA Engineer
```
Use @qa-engineer agent:
- Manual testing with Chrome
- Create E2E tests
- Validate acceptance criteria
- Generate evidence
```

### DevOps Engineer
```
Use @devops-engineer agent:
- Create PR
- Deploy to staging
- Run health checks
- Deploy to production
- Update Jira
- Notify Slack
```

## Output

### Success
```json
{
  "ticketId": "PROJ-123",
  "status": "completed",
  "phases": {
    "productManagement": {
      "status": "completed",
      "duration": "2m 15s",
      "agent": "@product-manager"
    },
    "uiDesign": {
      "status": "completed",
      "duration": "5m 30s",
      "agent": "@ui-designer",
      "artifacts": ["docs/designs/PROJ-123/"]
    },
    "technicalPlanning": {
      "status": "completed",
      "duration": "4m 45s",
      "agent": "@tech-architect",
      "artifacts": ["docs/tech-specs/PROJ-123/"]
    },
    "development": {
      "status": "completed",
      "duration": "25m 10s",
      "agent": "@developer",
      "commits": 5,
      "filesChanged": 12
    },
    "codeReview": {
      "status": "completed",
      "duration": "3m 20s",
      "agent": "@code-reviewer",
      "issues": 0
    },
    "qaTesting": {
      "status": "completed",
      "duration": "8m 45s",
      "agent": "@qa-engineer",
      "tests": 15,
      "passed": 15
    },
    "deployment": {
      "status": "completed",
      "duration": "3m 15s",
      "agent": "@devops-engineer",
      "productionUrl": "https://my-app.vercel.app"
    }
  },
  "totalDuration": "52m 50s",
  "jiraStatus": "Done"
}
```

### Failure
```json
{
  "ticketId": "PROJ-123",
  "status": "failed",
  "failedPhase": "qaTesting",
  "error": {
    "message": "3 E2E tests failed",
    "details": ["Test 1 failed: ...", "Test 2 failed: ...", "Test 3 failed: ..."]
  },
  "completedPhases": ["productManagement", "uiDesign", "technicalPlanning", "development", "codeReview"],
  "recommendations": [
    "Review failed tests in tests/e2e/PROJ-123/",
    "Fix issues and run /dev-pipeline:start-ticket PROJ-123 --from-phase qa"
  ]
}
```

## Quality Gates

Each phase must pass its quality gate before proceeding:

| Phase | Quality Gate |
|-------|--------------|
| Product Management | Acceptance criteria defined |
| UI Design | All components specified |
| Technical Planning | Implementation plan complete |
| Development | All tests passing, no lint errors |
| Code Review | No blocking issues |
| QA Testing | All acceptance criteria verified |
| Deployment | Health checks passing |

## Hooks

Pre/post hooks can be configured for each phase:

```yaml
hooks:
  development:
    pre:
      - npm run lint
    post:
      - npm run test
  deployment:
    pre:
      - npm audit --audit-level=high
    post:
      - echo "Deployed successfully"
```
