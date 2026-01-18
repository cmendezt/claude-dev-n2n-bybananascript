---
name: create-project
description: |
  Creates a new project from a template with all necessary configuration.
  Use when bootstrapping new projects or creating project structure.
---

# Create Project Skill

This skill creates a new project from scratch using templates.

## When to Use

- Creating a new project from template
- Setting up project structure
- Initializing git repository
- Installing dependencies

## Parameters

- `name` - Project name (slug format)
- `description` - Project description
- `stack` - Technology stack (react-typescript, nextjs)
- `path` - Where to create the project (optional, defaults to current directory)

## Process

### 1. Validate Inputs

Ensure project name is valid:
- Lowercase letters, numbers, hyphens only
- Doesn't start with a number
- Not a reserved name

### 2. Create Directory Structure

```bash
mkdir -p {project-name}
cd {project-name}
```

### 3. Copy Template

Based on the selected stack, copy the appropriate template:

**React + TypeScript:**
```
src/
├── api/           # API functions
├── components/    # React components
├── hooks/         # Custom hooks
├── lib/           # Utilities
├── pages/         # Route pages
├── types/         # TypeScript types
├── App.tsx
├── main.tsx
└── index.css
public/
├── index.html
tests/
├── unit/
└── e2e/
```

### 4. Configure Project

Update `package.json` with:
- Project name
- Description
- Author

### 5. Initialize Git

```bash
git init
git add .
git commit -m "feat: initial project setup from template"
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Verify Setup

```bash
npm run dev &
sleep 5
curl -s http://localhost:5173 > /dev/null && echo "OK" || echo "FAIL"
kill %1
```

## Output

```json
{
  "status": "success",
  "project": {
    "name": "my-project",
    "path": "/path/to/my-project",
    "stack": "react-typescript"
  },
  "files": {
    "created": 25,
    "total": "2.5MB"
  },
  "git": {
    "initialized": true,
    "initialCommit": "abc123"
  },
  "dependencies": {
    "installed": true,
    "count": 45
  },
  "verification": {
    "devServer": "passed",
    "build": "passed"
  }
}
```

## Error Handling

- If directory exists: Ask to overwrite or use different name
- If template not found: List available templates
- If dependencies fail: Show npm error and suggest fixes
