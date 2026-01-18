---
name: onboard
description: Analyze an existing project and configure the dev-pipeline to work with it
arguments:
  - name: path
    description: Path to the project root (defaults to current directory)
    required: false
    default: "."
---

# /dev-pipeline:onboard

Onboard an existing project to use the dev-pipeline plugin.

## What This Command Does

1. **Analyzes** your existing project structure
2. **Detects** framework, language, database, and tooling
3. **Generates** a `pipeline-config.yaml` tailored to your stack
4. **Sets up** the `.claude/` directory with appropriate configuration

## Usage

```bash
# Onboard current directory
/dev-pipeline:onboard

# Onboard a specific project
/dev-pipeline:onboard /path/to/project
```

## Detection Process

The onboard process will analyze:

### 1. Package Manager & Dependencies
- Read `package.json` for dependencies
- Detect React, Vue, Next.js, Express, etc.
- Identify styling libraries (Tailwind, styled-components)
- Identify state management (React Query, Zustand, Pinia)

### 2. Database & Backend
- Check for `src/lib/supabase.ts` or similar → Supabase
- Check for `prisma/` directory → PostgreSQL/MySQL with Prisma
- Check for `firebase.json` or firebase imports → Firebase
- Check for mongoose imports → MongoDB
- Check `.env` patterns for database URLs

### 3. Build & Testing Tools
- Detect Vite, Next.js, or other build tools
- Identify testing frameworks (Vitest, Jest, Playwright)

### 4. Project Structure
- Map existing directory structure
- Identify source, test, and docs directories

## Output

After analysis, the command will:

1. Show detected configuration for your review
2. Ask for confirmation or adjustments
3. Create `.claude/pipeline-config.yaml`
4. Optionally create missing directories (docs/, tests/)

## Example Output

```
Analyzing project at /path/to/project...

Detected Configuration:
-----------------------
Framework:    Next.js 14
Language:     TypeScript
Styling:      Tailwind CSS
Database:     PostgreSQL (Prisma)
Testing:      Jest + Playwright
Deployment:   Vercel (detected from vercel.json)

Integrations:
- GitHub: ✓ (detected .git)
- Jira: ? (not detected, will prompt)
- Slack: ✗ (not configured)

Is this correct? [Y/n/edit]
```

## Post-Onboard

After onboarding, you can:

1. Use `/dev-pipeline:start-ticket TICKET-ID` to process tickets
2. Use `/dev-pipeline:config` to adjust settings
3. Use `/dev-pipeline:status` to check pipeline status

## Notes

- This command does NOT modify your existing code
- It only creates configuration files in `.claude/`
- You can re-run onboard to update detection
- Manual adjustments can be made via `/dev-pipeline:config`

---

## Execution

Use the `onboard-project` skill to perform the analysis and configuration.
