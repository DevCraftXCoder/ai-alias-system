#!/usr/bin/env bash
# ai-alias-system installer — bash (macOS / Linux / WSL)
# Usage: curl -fsSL https://raw.githubusercontent.com/DevCraftXCoder/ai-alias-system/main/install/install.sh | bash
# Or: bash install.sh [--claude] [--codex] [--gemini]

set -e

REPO="https://github.com/DevCraftXCoder/ai-alias-system"
PKG="ai-alias-system"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()    { echo -e "${GREEN}[aias]${NC} $1"; }
warn()    { echo -e "${YELLOW}[warn]${NC} $1"; }
error()   { echo -e "${RED}[error]${NC} $1"; exit 1; }

# Detect package manager
if command -v pnpm &>/dev/null; then
  PM="pnpm dlx"
  info "Using pnpm"
elif command -v npx &>/dev/null; then
  PM="npx"
  info "Using npx (pnpm recommended: https://pnpm.io/installation)"
else
  error "Neither pnpm nor npx found. Install Node.js 18+ first."
fi

# Parse args
TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  info "Installing alias system for all AI tools..."
  $PM $PKG install
elif [ "$TARGET" == "--claude" ]; then
  info "Installing for Claude Code..."
  $PM $PKG install claude
elif [ "$TARGET" == "--codex" ]; then
  info "Installing for OpenAI Codex CLI..."
  $PM $PKG install codex
elif [ "$TARGET" == "--gemini" ]; then
  info "Installing for Google Gemini CLI..."
  $PM $PKG install gemini
else
  error "Unknown option: $TARGET. Use --claude, --codex, or --gemini."
fi

echo ""
info "Done! Edit the alias tables with your project entities."
info "Docs: $REPO"
