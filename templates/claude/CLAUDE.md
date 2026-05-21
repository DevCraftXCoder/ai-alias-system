# CLAUDE.md

> Project instructions for Claude Code. This file is loaded automatically at every session start.

---

## Project Aliases

@rules/project-aliases.md

---

## Architecture

[Brief description of your project architecture here]

---

## Commands

```bash
# Add your common dev commands here
npm run dev          # Start dev server
npm run typecheck    # TypeScript check
npm run test         # Run tests
npm run deploy       # Deploy
```

---

## Key Rules

- [Add your project-specific rules here]
- [e.g. "Always use cursor pagination, never OFFSET"]
- [e.g. "Edge runtime only — no Node.js APIs in CF Workers"]

---

## How to Use Aliases

This project uses a symbol alias system. Aliases are defined in `.claude/rules/project-aliases.md`.
Use them in prompts like:

```
Fix the bug in @API's #Auth flow — it's hitting $Stripe wrong.
Ask ~QAAgent to verify after.
```

Never re-explain what @API is — it's always the same entity defined in the alias table.
