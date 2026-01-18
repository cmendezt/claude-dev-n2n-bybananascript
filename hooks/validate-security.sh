#!/bin/bash
# =============================================================================
# Security Validation Hook
# Validates Bash commands before execution to prevent dangerous operations
# =============================================================================

set -euo pipefail

# Read input from stdin (JSON from Claude Code)
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Exit early if no command
[[ -z "$COMMAND" ]] && exit 0

# =============================================================================
# DANGEROUS COMMAND PATTERNS
# =============================================================================

# Destructive file operations
DESTRUCTIVE_PATTERNS="rm -rf /|rm -rf \"|rm -rf '|rm -rf \*|> /dev/|mkfs\.|dd if=|chmod 777|chmod -R 777"

# Privilege escalation
PRIVILEGE_PATTERNS="sudo|su -|doas|pkexec"

# Network attacks
NETWORK_PATTERNS="nc -l|ncat|netcat.*-e|/dev/tcp|curl.*\|.*sh|wget.*\|.*sh"

# Credential exposure
CREDENTIAL_PATTERNS="(password|secret|api.?key|token|credential|auth).*="

# Git dangerous operations
GIT_DANGEROUS="git push.*--force|git push.*-f|git reset --hard|git clean -fd"

# =============================================================================
# VALIDATION
# =============================================================================

# Check for destructive patterns
if echo "$COMMAND" | grep -iE "$DESTRUCTIVE_PATTERNS" > /dev/null 2>&1; then
  echo "BLOCKED: Potentially destructive command detected" >&2
  echo "Command: $COMMAND" >&2
  exit 2
fi

# Check for privilege escalation
if echo "$COMMAND" | grep -iE "$PRIVILEGE_PATTERNS" > /dev/null 2>&1; then
  echo "BLOCKED: Privilege escalation not allowed" >&2
  echo "Command: $COMMAND" >&2
  exit 2
fi

# Check for network attacks
if echo "$COMMAND" | grep -iE "$NETWORK_PATTERNS" > /dev/null 2>&1; then
  echo "BLOCKED: Potentially dangerous network operation" >&2
  echo "Command: $COMMAND" >&2
  exit 2
fi

# Check for credential exposure in commands
if echo "$COMMAND" | grep -iE "$CREDENTIAL_PATTERNS" > /dev/null 2>&1; then
  echo "WARNING: Potential credential in command - proceeding with caution" >&2
  # Don't block, just warn
fi

# Check for dangerous git operations
if echo "$COMMAND" | grep -iE "$GIT_DANGEROUS" > /dev/null 2>&1; then
  echo "BLOCKED: Dangerous git operation requires explicit user approval" >&2
  echo "Command: $COMMAND" >&2
  exit 2
fi

# =============================================================================
# ALLOWED - Command passed validation
# =============================================================================
exit 0
