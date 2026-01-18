# Dev Pipeline - Claude Code Plugin

An end-to-end autonomous development workflow plugin for Claude Code. Automates the entire software development lifecycle from ticket creation to production deployment.

## Features

- **Project Bootstrapping**: Create new projects with GitHub, Supabase, Vercel, and Jira integration
- **Autonomous Development**: Process tickets through all development phases automatically
- **8 Specialized Agents**: Each phase handled by an expert AI agent
- **QA Automation**: Chrome Extension + Playwright for comprehensive testing
- **Continuous Deployment**: Automatic deployment with health checks and rollback

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEV PIPELINE WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  JIRA    │──▶│    PM    │──▶│    UI    │──▶│   TECH   │    │
│  │  Ticket  │   │  Agent   │   │ Designer │   │ Architect│    │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘    │
│       │                                             │          │
│       ▼                                             ▼          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  UPDATE  │◀──│  DEPLOY  │◀──│    QA    │◀──│DEVELOPER │    │
│  │   JIRA   │   │  Vercel  │   │  Agent   │   │  Agent   │    │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Installation

1. Clone or copy this plugin to your Claude Code plugins directory:

```bash
# Clone the plugin
git clone https://github.com/your-org/dev-pipeline ~/.claude/plugins/dev-pipeline

# Or copy manually
cp -r dev-pipeline ~/.claude/plugins/
```

2. Configure environment variables:

```bash
# Create .env.local in your project
cp .env.example .env.local

# Edit with your credentials
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxx
VERCEL_TOKEN=xxxxxxxxxxxx
ATLASSIAN_API_TOKEN=xxxxxxxxxxxx
JIRA_EMAIL=user@example.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

3. Install required CLIs:

```bash
# GitHub CLI
brew install gh
gh auth login

# Supabase CLI
brew install supabase/tap/supabase

# Vercel CLI
npm install -g vercel
vercel login
```

## Usage

### Bootstrap a New Project

```bash
claude
> /dev-pipeline:init
```

This will interactively create:
- GitHub repository
- Supabase project with database
- Vercel deployment
- Jira project (optional)
- Full Claude Code configuration

### Process a Ticket

```bash
claude
> /dev-pipeline:start-ticket PROJ-123
```

This automatically:
1. Refines the ticket (Product Manager)
2. Creates UI designs (UI Designer)
3. Plans implementation (Tech Architect)
4. Implements the feature (Developer)
5. Reviews the code (Code Reviewer)
6. Tests the feature (QA Engineer)
7. Deploys to production (DevOps Engineer)
8. Updates Jira status

### Check Status

```bash
claude
> /dev-pipeline:status
```

### Configure Settings

```bash
claude
> /dev-pipeline:config
```

## Available Agents

| Agent | Description | Model |
|-------|-------------|-------|
| `@project-bootstrapper` | Creates projects from scratch | opus |
| `@product-manager` | Manages backlog and refines tickets | opus |
| `@ui-designer` | Creates UI/UX specifications | opus |
| `@tech-architect` | Plans technical implementation | opus |
| `@developer` | Implements code | sonnet |
| `@code-reviewer` | Reviews code quality | sonnet |
| `@qa-engineer` | Tests functionality | sonnet |
| `@devops-engineer` | Handles deployment | sonnet |

## Commands

| Command | Description |
|---------|-------------|
| `/dev-pipeline:init` | Bootstrap a new project |
| `/dev-pipeline:start-ticket TICKET-ID` | Process a ticket through the pipeline |
| `/dev-pipeline:status` | Show current pipeline status |
| `/dev-pipeline:config` | Configure settings and integrations |

## Project Structure

```
dev-pipeline/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── agents/                  # 8 specialized agents
│   ├── project-bootstrapper.md
│   ├── product-manager.md
│   ├── ui-designer.md
│   ├── tech-architect.md
│   ├── developer.md
│   ├── code-reviewer.md
│   ├── qa-engineer.md
│   └── devops-engineer.md
├── commands/                # Slash commands
│   ├── init.md
│   ├── start-ticket.md
│   ├── status.md
│   └── config.md
├── skills/                  # Reusable skills
│   ├── create-project/
│   ├── setup-integrations/
│   └── run-pipeline/
├── hooks/                   # Pre/post hooks
│   ├── hooks.json
│   ├── validate-security.sh
│   └── format-on-save.sh
├── templates/               # Project templates
│   └── react-typescript/
├── .mcp.json               # MCP server configuration
└── README.md
```

## Templates

### React + TypeScript (Default)

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Query for server state
- Supabase integration
- Vitest + Playwright testing

## Integrations

### MCP Servers

| Server | Purpose |
|--------|---------|
| `atlassian` | Jira ticket management |
| `playwright` | Browser automation testing |
| `github` | Repository management |
| `supabase` | Database and auth |
| `slack` | Notifications |
| `filesystem` | File operations |

### External Services

- **GitHub**: Repository hosting, PRs
- **Supabase**: Database, Auth, Storage
- **Vercel**: Deployment, Preview URLs
- **Jira/Atlassian**: Ticket management
- **Slack**: Team notifications

## Hooks

### Pre-Tool Hooks

- `validate-security.sh`: Blocks dangerous bash commands

### Post-Tool Hooks

- `format-on-save.sh`: Auto-formats code after edits

## Configuration

Configuration stored in `.claude/pipeline-config.yaml`:

```yaml
pipeline:
  defaultStack: react-typescript
  autoCommit: true
  requireCodeReview: true
  requireQA: true

integrations:
  github:
    enabled: true
    owner: my-org
  supabase:
    enabled: true
  vercel:
    enabled: true
  jira:
    enabled: true
  slack:
    enabled: true

agents:
  developer:
    model: sonnet
    autoFormat: true
```

## Requirements

- Claude Code CLI
- Node.js 18+
- Git
- GitHub CLI (`gh`)
- Supabase CLI
- Vercel CLI

## License

MIT

## Contributing

Contributions welcome! Please read the contribution guidelines first.

## Support

- Issues: [GitHub Issues](https://github.com/your-org/dev-pipeline/issues)
- Discussions: [GitHub Discussions](https://github.com/your-org/dev-pipeline/discussions)
