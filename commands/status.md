---
name: status
description: Show current pipeline status and recent activity
---

# /dev-pipeline:status

Displays the current status of the development pipeline.

## Usage

```
/dev-pipeline:status
/dev-pipeline:status PROJ-123
/dev-pipeline:status --all
```

## Arguments

- `TICKET_ID` (optional) - Show status for specific ticket

## Options

- `--all` - Show all recent tickets (last 10)
- `--active` - Show only active/in-progress tickets
- `--verbose` - Show detailed phase information

## Output

### Current Session

```
Dev Pipeline Status
===================

Active Ticket: PROJ-123 "Implement user authentication"

Pipeline Progress:
[x] Product Management  (completed 2m ago)
[x] UI Design           (completed 15m ago)
[x] Technical Planning  (completed 10m ago)
[>] Development         (in progress - 65% complete)
    Current: Implementing subtask 4/6
    Files modified: 8
    Tests added: 12
[ ] Code Review
[ ] QA Testing
[ ] Deployment

Branch: feature/PROJ-123
Last commit: feat(PROJ-123): add useAuth hook (3m ago)

Estimated completion: ~20 minutes
```

### Ticket-Specific Status

```
/dev-pipeline:status PROJ-123
```

```
Ticket: PROJ-123
================
Title: Implement user authentication
Status: In Development
Branch: feature/PROJ-123

Timeline:
- 10:00 AM  Started pipeline
- 10:02 AM  Product management completed
- 10:08 AM  UI design completed
- 10:18 AM  Technical planning completed
- 10:20 AM  Development started
- 10:45 AM  (current) Development 65% complete

Artifacts:
- Designs: docs/designs/PROJ-123/
- Tech Specs: docs/tech-specs/PROJ-123/
- Branch: feature/PROJ-123

Next Steps:
1. Complete remaining 2 subtasks
2. Run code review
3. Execute QA tests
4. Deploy to production
```

### All Recent Tickets

```
/dev-pipeline:status --all
```

```
Recent Pipeline Activity
========================

| Ticket    | Title                      | Status      | Last Activity |
|-----------|----------------------------|-------------|---------------|
| PROJ-125  | Add dashboard widgets      | In QA       | 5m ago        |
| PROJ-124  | Fix login redirect bug     | Deployed    | 1h ago        |
| PROJ-123  | User authentication        | In Dev      | 3m ago        |
| PROJ-122  | Update navbar styling      | Deployed    | 2h ago        |
| PROJ-121  | Add search functionality   | Deployed    | 3h ago        |

Summary:
- Active: 2 tickets
- Deployed today: 3 tickets
- Average pipeline time: 48m
```

### Verbose Output

```
/dev-pipeline:status PROJ-123 --verbose
```

```
Ticket: PROJ-123 - Detailed Status
==================================

Phase 1: Product Management
---------------------------
Status: Completed
Duration: 2m 15s
Agent: @product-manager
Output:
  - Story points: 5
  - Priority: Must Have
  - Acceptance criteria: 8 items
  - Dependencies: None

Phase 2: UI Design
------------------
Status: Completed
Duration: 5m 30s
Agent: @ui-designer
Output:
  - Components defined: 6
  - Wireframes: 3 (mobile, tablet, desktop)
  - Design tokens: 24
  - Accessibility notes: 12 items
Files:
  - docs/designs/PROJ-123/components.md
  - docs/designs/PROJ-123/wireframes.md
  - docs/designs/PROJ-123/tokens.json
  - docs/designs/PROJ-123/accessibility.md

Phase 3: Technical Planning
---------------------------
Status: Completed
Duration: 4m 45s
Agent: @tech-architect
Output:
  - Files to create: 9
  - Files to modify: 2
  - Subtasks: 6
  - API endpoints: 4
Files:
  - docs/tech-specs/PROJ-123/implementation-plan.md
  - docs/tech-specs/PROJ-123/api-contracts.yaml
  - docs/tech-specs/PROJ-123/subtasks.json

Phase 4: Development
--------------------
Status: In Progress (65%)
Duration: 25m (ongoing)
Agent: @developer
Progress:
  - Subtask 1: [x] Create types (src/types/auth.ts)
  - Subtask 2: [x] Implement API (src/api/auth.ts)
  - Subtask 3: [x] Create hooks (src/hooks/useAuth.ts)
  - Subtask 4: [>] Create components (in progress)
  - Subtask 5: [ ] Integration
  - Subtask 6: [ ] Unit tests
Commits:
  - feat(PROJ-123): add auth types
  - feat(PROJ-123): implement auth API
  - feat(PROJ-123): add useAuth hook
  - feat(PROJ-123): add LoginForm component (latest)

Phase 5: Code Review
--------------------
Status: Pending
Agent: @code-reviewer

Phase 6: QA Testing
-------------------
Status: Pending
Agent: @qa-engineer

Phase 7: Deployment
-------------------
Status: Pending
Agent: @devops-engineer
```

## Integration Info

```
/dev-pipeline:status --integrations
```

```
Integration Status
==================

GitHub:
  - Repository: org/my-project
  - Default branch: main
  - Open PRs: 2
  - Status: Connected

Supabase:
  - Project: my-project-abc123
  - Region: us-east-1
  - Status: Connected

Vercel:
  - Project: my-project
  - Production URL: https://my-project.vercel.app
  - Last deploy: 2h ago
  - Status: Connected

Jira:
  - Project: PROJ
  - Active sprint: Sprint 5
  - Open tickets: 12
  - Status: Connected

Slack:
  - Workspace: My Team
  - Channel: #deployments
  - Status: Connected
```
