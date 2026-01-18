# Dev Pipeline - Claude Code Plugin

An end-to-end autonomous development workflow plugin for Claude Code. Automates the entire software development lifecycle from ticket creation to production deployment.

## Features

- **Multi-Stack Support**: React, Vue, Next.js, and Express templates
- **Database Flexibility**: Supabase, PostgreSQL (Prisma/Drizzle), MongoDB, Firebase, or no database
- **Project Bootstrapping**: Create new projects with GitHub, Supabase, Vercel, and Jira integration
- **Existing Project Onboarding**: Integrate with existing codebases using automatic stack detection
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

This will interactively ask for:

- **Project name** (slug format)
- **Stack** (react-typescript, nextjs, vue-typescript, node-express)
- **Database** (supabase, postgresql, mongodb, firebase, none)
- **Services to configure** (GitHub, Vercel, Jira, Slack)

Then automatically create:

- GitHub repository
- Database project (if selected)
- Vercel deployment
- Jira project (optional)
- Full Claude Code configuration

### Onboard an Existing Project

```bash
claude
> /dev-pipeline:onboard
```

This will analyze your existing codebase and:

1. Detect framework (React, Vue, Next.js, Express)
2. Detect database (Supabase, Prisma, MongoDB, Firebase)
3. Detect styling (Tailwind, styled-components, etc.)
4. Detect testing frameworks
5. Generate `pipeline-config.yaml` for the pipeline

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

## Supported Stacks

| Stack              | Description                                    | Default Database |
| ------------------ | ---------------------------------------------- | ---------------- |
| `react-typescript` | React 18 + Vite + Tailwind + React Query       | Supabase         |
| `nextjs`           | Next.js 14 App Router + Tailwind + React Query | Supabase         |
| `vue-typescript`   | Vue 3 + Vite + Tailwind + Pinia                | Supabase         |
| `node-express`     | Express + TypeScript (backend only)            | PostgreSQL       |

## Supported Databases

| Database     | ORM/ODM           | Description                  |
| ------------ | ----------------- | ---------------------------- |
| `supabase`   | Supabase Client   | PostgreSQL + Auth + Storage  |
| `postgresql` | Prisma or Drizzle | Direct PostgreSQL connection |
| `mongodb`    | Mongoose          | MongoDB document database    |
| `firebase`   | Firebase SDK      | Firestore + Auth             |
| `none`       | -                 | Configure manually later     |

## Available Agents

| Agent                   | Description                         | Model  |
| ----------------------- | ----------------------------------- | ------ |
| `@project-bootstrapper` | Creates projects from scratch       | opus   |
| `@product-manager`      | Manages backlog and refines tickets | opus   |
| `@ui-designer`          | Creates UI/UX specifications        | opus   |
| `@tech-architect`       | Plans technical implementation      | opus   |
| `@developer`            | Implements code (multi-stack aware) | sonnet |
| `@code-reviewer`        | Reviews code quality                | sonnet |
| `@qa-engineer`          | Tests functionality                 | sonnet |
| `@devops-engineer`      | Handles deployment                  | sonnet |

## Commands

| Command                                | Description                                           |
| -------------------------------------- | ----------------------------------------------------- |
| `/dev-pipeline:init`                   | Bootstrap a new project with stack/database selection |
| `/dev-pipeline:onboard`                | Onboard an existing project with auto-detection       |
| `/dev-pipeline:start-ticket TICKET-ID` | Process a ticket through the pipeline                 |
| `/dev-pipeline:status`                 | Show current pipeline status                          |
| `/dev-pipeline:config`                 | Configure settings and integrations                   |

## Project Structure

```
dev-pipeline/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest (v2.0.0)
├── agents/                  # 8 specialized agents
│   ├── project-bootstrapper.md
│   ├── product-manager.md
│   ├── ui-designer.md
│   ├── tech-architect.md
│   ├── developer.md         # Multi-stack aware
│   ├── code-reviewer.md
│   ├── qa-engineer.md
│   └── devops-engineer.md
├── commands/                # Slash commands
│   ├── init.md              # Stack + database selection
│   ├── onboard.md           # NEW: Existing project onboarding
│   ├── start-ticket.md
│   ├── status.md
│   └── config.md
├── skills/                  # Reusable skills
│   ├── create-project/
│   ├── setup-integrations/
│   ├── onboard-project/     # NEW: Auto-detection skill
│   └── run-pipeline/
├── schemas/                 # NEW: Configuration schemas
│   └── pipeline-config.schema.yaml
├── templates/               # Project templates
│   ├── registry.yaml        # NEW: Template registry
│   ├── react-typescript/    # React + Vite
│   ├── nextjs/              # NEW: Next.js 14
│   ├── vue-typescript/      # NEW: Vue 3
│   ├── node-express/        # NEW: Express API
│   └── _database/           # NEW: Database client templates
│       ├── supabase/
│       ├── postgresql-prisma/
│       ├── postgresql-drizzle/
│       ├── mongodb-mongoose/
│       ├── firebase/
│       └── none/
├── hooks/                   # Pre/post hooks
│   ├── hooks.json
│   ├── validate-security.sh
│   └── format-on-save.sh
├── .mcp.json               # MCP server configuration
└── README.md
```

## Templates

### React + TypeScript

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Query for server state
- Supabase integration (default)
- Vitest + Playwright testing

### Next.js (NEW in v2.0)

- Next.js 14 App Router
- TypeScript strict mode
- Tailwind CSS + shadcn patterns
- React Query for client state
- Vitest + Playwright testing

### Vue + TypeScript (NEW in v2.0)

- Vue 3 Composition API
- TypeScript + Vite
- Tailwind CSS
- Pinia for state management
- TanStack Query (Vue Query)
- Vitest + Playwright testing

### Node.js + Express (NEW in v2.0)

- Express 4 + TypeScript
- Zod validation
- Error handling middleware
- Request logging
- Vitest testing
- Health check endpoints

## Configuration

Configuration stored in `.claude/pipeline-config.yaml`:

```yaml
project:
  name: my-project
  description: My awesome project

stack:
  framework: react # react | vue | nextjs | express
  language: typescript
  styling: tailwind

database:
  type: supabase # supabase | postgresql | mongodb | firebase | none
  orm: null # prisma | drizzle | mongoose | null

deployment:
  platform: vercel # vercel | netlify | railway | none
  region: auto

pipeline:
  autoCommit: true
  requireCodeReview: true
  requireQA: true

integrations:
  github:
    enabled: true
    owner: my-org
  supabase:
    enabled: true
    projectRef: abc123
  vercel:
    enabled: true
  jira:
    enabled: true
    projectKey: PROJ
  slack:
    enabled: true

agents:
  developer:
    model: sonnet
    autoFormat: true
  qa:
    model: sonnet
    useChromeExtension: true
```

## Integrations

### MCP Servers

| Server       | Purpose                    |
| ------------ | -------------------------- |
| `atlassian`  | Jira ticket management     |
| `playwright` | Browser automation testing |
| `github`     | Repository management      |
| `supabase`   | Database and auth          |
| `slack`      | Notifications              |
| `filesystem` | File operations            |

### External Services

- **GitHub**: Repository hosting, PRs
- **Supabase**: Database, Auth, Storage (optional)
- **PostgreSQL**: Direct database with Prisma/Drizzle (optional)
- **MongoDB**: Document database with Mongoose (optional)
- **Firebase**: Firestore + Auth (optional)
- **Vercel**: Deployment, Preview URLs
- **Jira/Atlassian**: Ticket management
- **Slack**: Team notifications

## Hooks

### Pre-Tool Hooks

- `validate-security.sh`: Blocks dangerous bash commands

### Post-Tool Hooks

- `format-on-save.sh`: Auto-formats code after edits

## Requirements

- Claude Code CLI
- Node.js 18+
- Git
- GitHub CLI (`gh`)
- Supabase CLI (if using Supabase)
- Vercel CLI (if deploying to Vercel)

## Version History

### v2.0.0 (Current)

- Multi-stack support: React, Vue, Next.js, Express
- Multi-database support: Supabase, PostgreSQL, MongoDB, Firebase
- New `/dev-pipeline:onboard` command for existing projects
- Template registry system
- Database client templates
- Conditional agent instructions based on stack

### v1.0.0

- Initial release with React + Supabase

## License

MIT

## Contributing

Contributions welcome! Please read the contribution guidelines first.

## Support

- Issues: [GitHub Issues](https://github.com/your-org/dev-pipeline/issues)
- Discussions: [GitHub Discussions](https://github.com/your-org/dev-pipeline/discussions)
