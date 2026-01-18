---
name: init
description: Bootstrap a new project with all integrations (GitHub, Supabase, Vercel, Jira)
---

# /dev-pipeline:init

Creates a new project from scratch with all necessary integrations.

## Usage

```
/dev-pipeline:init
/dev-pipeline:init --name my-project --stack react-typescript
```

## Interactive Flow

When executed without arguments, this command will interactively ask for:

1. **Project name** (slug format, e.g., `my-awesome-app`)
2. **Description** (brief description of the project)
3. **Stack** (react-typescript, nextjs, etc.)
4. **Services to configure** (GitHub, Supabase, Vercel, Jira)
5. **GitHub organization/owner**

## Process

### Step 1: Gather Information

Ask the user for:
- Project name (required)
- Description (required)
- Stack selection (default: react-typescript)
- Services to configure (checkboxes)

### Step 2: Create GitHub Repository

Use the project-bootstrapper agent to:
```bash
gh repo create {project-name} --public --description "{description}" --clone
cd {project-name}
```

### Step 3: Initialize Project from Template

Copy the selected template:
```bash
cp -r {plugin-path}/templates/react-typescript/* .
npm install
```

### Step 4: Configure Supabase (if selected)

```bash
supabase init
supabase link --project-ref {ref}
supabase db push
supabase gen types typescript --local > src/types/database.ts
```

### Step 5: Configure Vercel (if selected)

```bash
vercel link --yes
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Step 6: Configure Jira (if selected)

Use Atlassian skill to create project:
```
/atlassian:spec-to-backlog
Create initial backlog for {project-name}
```

### Step 7: Generate Configuration

Create `.claude/` directory with:
- Agents from the plugin
- CLAUDE.md with project documentation
- .mcp.json with server configurations

### Step 8: Initial Commit

```bash
git add .
git commit -m "feat: initial project setup

- {Stack} project structure
- Supabase integration
- Vercel deployment config
- Claude Code agents

Co-Authored-By: Claude Code <noreply@anthropic.com>"

git push -u origin main
```

## Output

```json
{
  "project": {
    "name": "my-project",
    "path": "/path/to/my-project",
    "description": "My awesome project"
  },
  "integrations": {
    "github": {
      "url": "https://github.com/owner/my-project",
      "status": "created"
    },
    "supabase": {
      "projectRef": "abc123",
      "url": "https://abc123.supabase.co",
      "status": "configured"
    },
    "vercel": {
      "url": "https://my-project.vercel.app",
      "status": "deployed"
    },
    "jira": {
      "projectKey": "MYPROJ",
      "status": "created"
    }
  },
  "nextSteps": [
    "cd my-project",
    "Configure .env.local with your credentials",
    "Run npm run dev to start development",
    "Create your first ticket in Jira",
    "Run /dev-pipeline:start-ticket MYPROJ-1"
  ]
}
```

## Requirements

- `gh` CLI installed and authenticated
- `supabase` CLI installed
- `vercel` CLI installed
- Node.js 18+
- npm or pnpm

## Environment Variables

The following environment variables should be configured:
- `GITHUB_TOKEN` - For repository creation
- `SUPABASE_ACCESS_TOKEN` - For Supabase project creation
- `VERCEL_TOKEN` - For Vercel deployment
- `ATLASSIAN_API_TOKEN` - For Jira integration (optional)
