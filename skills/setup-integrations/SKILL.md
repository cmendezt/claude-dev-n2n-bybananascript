---
name: setup-integrations
description: |
  Configures external service integrations (GitHub, Supabase, Vercel, Jira).
  Use when setting up project integrations or reconfiguring services.
---

# Setup Integrations Skill

This skill configures external service integrations for the project.

## When to Use

- Setting up GitHub repository
- Configuring Supabase database
- Setting up Vercel deployment
- Creating Jira project
- Configuring Slack notifications

## Available Integrations

### GitHub

Creates and configures GitHub repository.

**Requirements:**
- `gh` CLI installed
- `GITHUB_TOKEN` environment variable

**Process:**
```bash
# Create repository
gh repo create {project-name} --public --description "{description}"

# Or link existing
gh repo clone {owner}/{repo}

# Configure branch protection (optional)
gh api repos/{owner}/{repo}/branches/main/protection \
  -X PUT \
  -f required_status_checks='{"strict":true,"contexts":["test","build"]}'
```

### Supabase

Initializes and configures Supabase project.

**Requirements:**
- `supabase` CLI installed
- `SUPABASE_ACCESS_TOKEN` environment variable

**Process:**
```bash
# Initialize Supabase
supabase init

# Link to existing project
supabase link --project-ref {project-ref}

# Or create new project
supabase projects create {name} --org-id {org}

# Apply initial migration
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > src/types/database.ts
```

**Initial Schema:**
```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users profile
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
```

### Vercel

Configures Vercel deployment.

**Requirements:**
- `vercel` CLI installed
- `VERCEL_TOKEN` environment variable

**Process:**
```bash
# Link project
vercel link --yes

# Configure environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Initial deploy
vercel --prod --yes
```

### Jira

Creates Jira project and configures board.

**Requirements:**
- Atlassian API access
- `ATLASSIAN_API_TOKEN` environment variable

**Process:**
- Use MCP Atlassian skill to create project
- Configure board columns: Backlog | Ready | In Progress | Review | Done
- Create initial epic for project setup

### Slack

Configures Slack notifications.

**Requirements:**
- Slack webhook URL
- `SLACK_WEBHOOK_URL` environment variable

**Process:**
- Test webhook connection
- Configure notification channel
- Send test message

## Parameters

- `services` - Array of services to configure (github, supabase, vercel, jira, slack)
- `projectName` - Name of the project
- `options` - Service-specific options

## Output

```json
{
  "status": "success",
  "integrations": {
    "github": {
      "status": "configured",
      "url": "https://github.com/owner/project",
      "defaultBranch": "main"
    },
    "supabase": {
      "status": "configured",
      "projectRef": "abc123xyz",
      "url": "https://abc123xyz.supabase.co",
      "typesGenerated": true
    },
    "vercel": {
      "status": "configured",
      "projectName": "my-project",
      "productionUrl": "https://my-project.vercel.app",
      "envVarsConfigured": 2
    },
    "jira": {
      "status": "configured",
      "projectKey": "PROJ",
      "boardId": "123"
    },
    "slack": {
      "status": "configured",
      "channel": "#deployments",
      "testMessageSent": true
    }
  },
  "envFile": ".env.local created with required variables"
}
```

## Error Handling

- If CLI not installed: Provide installation instructions
- If token missing: Guide user to create and configure token
- If service already configured: Ask to reconfigure or skip
- If connection fails: Show error and retry options
