---
name: config
description: Configure dev-pipeline settings and integrations
---

# /dev-pipeline:config

Configure the development pipeline settings and integrations.

## Usage

```
/dev-pipeline:config
/dev-pipeline:config --show
/dev-pipeline:config --set KEY=VALUE
/dev-pipeline:config --integration github
```

## Options

- `--show` - Display current configuration
- `--set KEY=VALUE` - Set a configuration value
- `--integration NAME` - Configure specific integration
- `--reset` - Reset to default configuration

## Interactive Configuration

When run without options, enters interactive mode:

```
/dev-pipeline:config
```

```
Dev Pipeline Configuration
==========================

1. GitHub Integration
2. Supabase Integration
3. Vercel Integration
4. Jira Integration
5. Slack Integration
6. Pipeline Settings
7. Agent Settings
8. Show Current Config
9. Exit

Select option: _
```

## Show Configuration

```
/dev-pipeline:config --show
```

```yaml
# Dev Pipeline Configuration
# Location: .claude/pipeline-config.yaml

pipeline:
  defaultStack: react-typescript
  autoCommit: true
  autoFormat: true
  requireCodeReview: true
  requireQA: true

integrations:
  github:
    enabled: true
    owner: my-org
    defaultBranch: main

  supabase:
    enabled: true
    projectRef: abc123xyz

  vercel:
    enabled: true
    projectName: my-project
    productionUrl: https://my-project.vercel.app

  jira:
    enabled: true
    host: https://my-org.atlassian.net
    projectKey: PROJ

  slack:
    enabled: true
    channel: "#deployments"

agents:
  productManager:
    model: opus
    skipIfRefined: true

  uiDesigner:
    model: opus
    generateWireframes: true

  techArchitect:
    model: opus
    includeApiContracts: true

  developer:
    model: sonnet
    autoFormat: true
    commitStyle: conventional

  codeReviewer:
    model: sonnet
    checkSecurity: true
    checkAccessibility: true

  qaEngineer:
    model: sonnet
    generateE2ETests: true
    recordGifs: true

  devopsEngineer:
    model: sonnet
    autoRollback: true
    notifySlack: true

hooks:
  preDeploy:
    - npm run test
    - npm run build
    - npm audit --audit-level=high
  postDeploy:
    - echo "Deployed!"
```

## Set Configuration

```
/dev-pipeline:config --set pipeline.autoCommit=false
/dev-pipeline:config --set agents.developer.model=opus
/dev-pipeline:config --set integrations.jira.projectKey=NEWPROJ
```

## Configure Integrations

### GitHub

```
/dev-pipeline:config --integration github
```

```
GitHub Configuration
====================

Current settings:
- Owner: my-org
- Default branch: main
- Token: ****configured****

Actions:
1. Change owner/organization
2. Change default branch
3. Update token
4. Test connection
5. Back

Select: _
```

### Supabase

```
/dev-pipeline:config --integration supabase
```

```
Supabase Configuration
======================

Current settings:
- Project ref: abc123xyz
- URL: https://abc123xyz.supabase.co
- Token: ****configured****

Actions:
1. Link different project
2. Update access token
3. Generate types
4. Test connection
5. Back

Select: _
```

### Vercel

```
/dev-pipeline:config --integration vercel
```

```
Vercel Configuration
====================

Current settings:
- Project: my-project
- Production URL: https://my-project.vercel.app
- Token: ****configured****

Actions:
1. Link different project
2. Update token
3. Configure environment variables
4. Test connection
5. Back

Select: _
```

### Jira

```
/dev-pipeline:config --integration jira
```

```
Jira Configuration
==================

Current settings:
- Host: https://my-org.atlassian.net
- Project key: PROJ
- Email: user@example.com
- Token: ****configured****

Actions:
1. Change Jira host
2. Change project key
3. Update credentials
4. Test connection
5. Configure workflow mapping
6. Back

Select: _
```

### Slack

```
/dev-pipeline:config --integration slack
```

```
Slack Configuration
===================

Current settings:
- Channel: #deployments
- Webhook: ****configured****

Actions:
1. Change notification channel
2. Update webhook URL
3. Test notification
4. Configure notification types
5. Back

Select: _
```

## Pipeline Settings

```
/dev-pipeline:config --pipeline
```

```
Pipeline Settings
=================

General:
- Default stack: react-typescript
- Auto-commit: enabled
- Auto-format: enabled

Quality Gates:
- Require code review: enabled
- Require QA: enabled
- Minimum test coverage: 80%
- Security audit level: high

Phases:
- Skip design if exists: disabled
- Skip QA for hotfixes: disabled
- Auto-deploy after QA: enabled

Timeouts:
- Phase timeout: 30 minutes
- Total pipeline timeout: 2 hours

Actions:
1. Edit general settings
2. Edit quality gates
3. Edit phase settings
4. Edit timeouts
5. Back

Select: _
```

## Agent Settings

```
/dev-pipeline:config --agents
```

```
Agent Settings
==============

| Agent            | Model  | Special Settings           |
|------------------|--------|----------------------------|
| product-manager  | opus   | skipIfRefined: true        |
| ui-designer      | opus   | generateWireframes: true   |
| tech-architect   | opus   | includeApiContracts: true  |
| developer        | sonnet | autoFormat: true           |
| code-reviewer    | sonnet | checkSecurity: true        |
| qa-engineer      | sonnet | generateE2ETests: true     |
| devops-engineer  | sonnet | autoRollback: true         |

Actions:
1. Configure product-manager
2. Configure ui-designer
3. Configure tech-architect
4. Configure developer
5. Configure code-reviewer
6. Configure qa-engineer
7. Configure devops-engineer
8. Back

Select: _
```

## Reset Configuration

```
/dev-pipeline:config --reset
```

```
WARNING: This will reset all configuration to defaults.
All integration settings will need to be reconfigured.

Are you sure? (yes/no): _
```

## Configuration File Location

The configuration is stored in:
- Project-level: `.claude/pipeline-config.yaml`
- Global: `~/.claude/pipeline-config.yaml`

Project-level configuration takes precedence over global configuration.

## Environment Variables

Required environment variables (store in `.env.local`):

```bash
# GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# Supabase
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxx
SUPABASE_PROJECT_REF=abc123xyz

# Vercel
VERCEL_TOKEN=xxxxxxxxxxxx

# Jira/Atlassian
ATLASSIAN_API_TOKEN=xxxxxxxxxxxx
JIRA_EMAIL=user@example.com

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```
