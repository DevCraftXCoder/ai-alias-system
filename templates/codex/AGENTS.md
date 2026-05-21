# AGENTS.md

> Project instructions for OpenAI Codex CLI. This file is loaded automatically when you run `codex` in this directory.

---

## Project Alias System

<!-- ALIAS SYSTEM — DO NOT REMOVE THIS BLOCK -->

This project uses a symbol shorthand system for concise AI prompts.
Source: https://github.com/DevCraftXCoder/ai-alias-system

### Symbol Legend

```
@  = project/repo/sub-package
$  = external service/client
#  = topic/workstream/feature area
&  = team/role/domain
%  = asset/resource/data store
~  = agent/bot/automated system
```

### @ Projects

| Alias | Repo / Path | Description |
|-------|-------------|-------------|
| @API  | packages/api/ | [Your API service] |
| @Web  | apps/web/     | [Your frontend]    |

### $ External Services

| Alias | Service | Notes |
|-------|---------|-------|
| $Stripe | Stripe | Payments |
| $Supabase | Supabase | Database + Auth |

### # Topics

| Alias | Scope |
|-------|-------|
| #Auth | Authentication, tokens, sessions |
| #Feed | Content feed, pagination |

### & Teams / Roles

| Alias | Scope |
|-------|-------|
| &Backend | API, database, infra |
| &Frontend | Web, mobile, UI |

### % Assets

| Alias | Location / Service |
|-------|--------------------|
| %DB | [Your database] |
| %Cache | [Your cache layer] |

### ~ Agents / Bots

| Alias | Purpose |
|-------|---------|
| ~QAAgent | Typecheck + tests |
| ~Deployer | CI/CD automation |

<!-- END ALIAS SYSTEM -->

---

## Architecture

[Brief description of your project architecture here]

---

## Key Rules

- [Add your project-specific rules here]
- Always use the alias vocabulary above when referencing project entities
- Example: "Fix the bug in @API's #Auth flow" instead of spelling out the full path

---

## Common Commands

```bash
npm run dev          # Start dev server
npm run typecheck    # TypeScript check
npm run test         # Run tests
```
