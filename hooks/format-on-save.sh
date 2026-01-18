#!/bin/bash
# =============================================================================
# Format on Save Hook
# Automatically formats files after they are edited or written
# =============================================================================

set -euo pipefail

# Read input from stdin (JSON from Claude Code)
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Exit early if no file
[[ -z "$FILE" ]] && exit 0

# Exit if file doesn't exist
[[ ! -f "$FILE" ]] && exit 0

# =============================================================================
# FORMAT BY FILE TYPE
# =============================================================================

case "$FILE" in
  # TypeScript and JavaScript
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs)
    if command -v npx &> /dev/null; then
      # Try prettier first
      npx prettier --write "$FILE" 2>/dev/null || true
      # Then eslint fix
      npx eslint --fix "$FILE" 2>/dev/null || true
    fi
    ;;

  # Python
  *.py)
    if command -v black &> /dev/null; then
      black "$FILE" 2>/dev/null || true
    elif command -v autopep8 &> /dev/null; then
      autopep8 --in-place "$FILE" 2>/dev/null || true
    fi
    ;;

  # JSON
  *.json)
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;

  # Markdown
  *.md|*.mdx)
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;

  # YAML
  *.yml|*.yaml)
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;

  # CSS and variants
  *.css|*.scss|*.sass|*.less)
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;

  # HTML
  *.html|*.htm)
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;

  # Shell scripts
  *.sh|*.bash)
    if command -v shfmt &> /dev/null; then
      shfmt -w "$FILE" 2>/dev/null || true
    fi
    ;;

  # Go
  *.go)
    if command -v gofmt &> /dev/null; then
      gofmt -w "$FILE" 2>/dev/null || true
    fi
    ;;

  # Rust
  *.rs)
    if command -v rustfmt &> /dev/null; then
      rustfmt "$FILE" 2>/dev/null || true
    fi
    ;;
esac

# =============================================================================
# SUCCESS
# =============================================================================
exit 0
