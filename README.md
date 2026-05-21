<div align="center">

# ai-alias-system

**Symbol-shorthand notation for directing AI coding assistants with compact project context.**

[![npm](https://img.shields.io/npm/v/ai-alias-system?color=CB3837&logo=npm)](https://www.npmjs.com/package/ai-alias-system)
[![pnpm](https://img.shields.io/badge/pnpm-dlx-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Works with **Claude Code**, **OpenAI Codex CLI**, and **Google Gemini CLI**.

</div>

---

## The Problem

Every AI coding session starts with the same re-explanation:

```
"In the packages/api package — that's the Hono backend, TypeScript,
deployed on Cloudflare Workers with D1 as the database..."
```

You repeat this dozens of times per week. The AI forgets between sessions.

The alias system fixes this once.

---

## The Solution

Define a vocabulary once. Use compact symbols in every prompt from then on.

```
In @API #Auth, there's a bug with JWT refresh token rotation hitting %DB.
```

The AI already knows what each symbol means — no re-explanation needed.

---

## The Six Symbols

| Symbol | Meaning | Example |
|--------|---------|---------|
| `@` | Project / repository / sub-package | `@API`, `@Web`, `@MobileApp` |
| `$` | External service / third-party API | `$Stripe`, `$Supabase`, `$GitHub` |
| `#` | Topic / workstream / feature area | `#Auth`, `#Feed`, `#Payments` |
| `&` | Team / role / responsibility domain | `&Backend`, `&Design`, `&Infra` |
| `%` | Asset / resource / data store | `%DB`, `%S3`, `%Redis` |
| `~` | Agent / bot / automated system | `~DeployBot`, `~ReviewBot` |

---

## Quick Install

```bash
# Install into all detected AI tools in your project
pnpm dlx ai-alias-system install

# Claude Code only
pnpm dlx ai-alias-system install claude

# Codex CLI only
pnpm dlx ai-alias-system install codex

# Gemini CLI only
pnpm dlx ai-alias-system install gemini

# Interactive wizard — walks you through creating your alias table
pnpm dlx ai-alias-system init
```

Or with npm:

```bash
npx ai-alias-system install
```

Or install globally:

```bash
pnpm add -g ai-alias-system

# Then use the short alias anywhere:
aias install
aias init
aias status
```

---

## What Gets Installed

### Claude Code
- Appends `@rules/project-aliases.md` import to your `CLAUDE.md`
- Creates `.claude/rules/project-aliases.md` with your alias table
- Claude reads this at session start — aliases are active immediately

### Codex CLI (OpenAI)
- Creates or updates `AGENTS.md` in your project root
- Codex reads `AGENTS.md` before every conversation

### Gemini CLI (Google)
- Creates or updates `GEMINI.md` in your project root
- Gemini reads `GEMINI.md` for project context

---

## How to Define Your Aliases

Run `pnpm dlx ai-alias-system init` to get an interactive wizard, or edit the generated table directly.

### Monorepo

```markdown
## @ Projects

| Alias    | Repo / Path         | Description                    |
|----------|---------------------|--------------------------------|
| @App     | (root)              | Main monorepo                  |
| @API     | packages/api/       | Express / Hono backend         |
| @Web     | packages/web/       | Next.js frontend               |
| @Mobile  | packages/mobile/    | React Native app               |
| @Workers | packages/workers/   | Background job processors      |

## $ External Services

| Alias     | Service    | Notes                              |
|-----------|------------|------------------------------------|
| $Stripe   | Stripe     | Subscriptions, checkout, webhooks  |
| $Supabase | Supabase   | Database + Auth                    |
| $SendGrid | SendGrid   | Transactional email                |

## # Topics

| Alias      | Scope                                  |
|------------|----------------------------------------|
| #Auth      | Login, JWT, OAuth, session management  |
| #Billing   | Stripe subscriptions, invoices, tiers  |
| #Onboarding| Signup flow, email verify, first login |
| #Feed      | Timeline, pagination, recommendations  |

## % Assets / Resources

| Alias  | Location                  |
|--------|---------------------------|
| %DB    | Primary database (Postgres)|
| %Cache | Redis / Upstash            |
| %S3    | File storage (S3 / R2)     |
```

### Single repo

```markdown
## @ Projects

| Alias | Repo / Path | Description   |
|-------|-------------|---------------|
| @App  | (root)      | This project  |

## $ External Services

| Alias     | Service   | Notes              |
|-----------|-----------|--------------------|
| $Stripe   | Stripe    | Payments           |
| $Supabase | Supabase  | Database + Auth    |

## # Topics

| Alias  | Scope            |
|--------|------------------|
| #Auth  | Auth flows       |
| #Billing | Stripe billing |
```

---

## Before and After

**Without aliases:**

```
In the packages/api Express backend, in the authentication middleware file,
there's a bug with how the JWT refresh token rotation interacts with the
Redis session store when a user has multiple active devices...
```

**With aliases:**

```
In @API #Auth, JWT refresh rotation breaks when a user has multiple devices hitting %Cache.
```

Same information. 60% fewer words. No ambiguity.

---

## Prompt Patterns

```
# Bug fix
@API #Auth — 401 on token refresh, userId not propagating to route handlers.

# Feature work
Add cursor pagination to @Web #Feed — use %DB, match the pattern from @API.

# Cross-service
$Stripe webhook isn't syncing subscription tier to @API #Billing after renewal.

# Multi-repo
@Web needs to call @API /api/admin/stats — add the route on both sides.

# Deploy
After fixing @API #Auth, deploy the worker — run build + push to prod.

# Team routing
Assign @Mobile #Auth to &MobileTeam, @API #Auth to &Backend.
```

---

## Why Symbols?

**Compact** — `@API` vs `the packages/api Express backend deployed on...`

**Unambiguous** — symbols don't appear in natural language, so they stand out as references

**Tool-agnostic** — works in Claude, Codex, Gemini, ChatGPT, Cursor, any text input

**Learnable** — the AI learns your symbols from the table once per session; you never re-explain

**Grep-able** — `grep -r "@API"` across your conversation history finds every relevant session

---

## Installation

### Requirements
- Node.js 18+
- pnpm 9+ (or npm/npx)

> **pnpm config:** This repo ships `npmrc.txt`. Rename it to `.npmrc` after cloning:
> ```bash
> mv npmrc.txt .npmrc   # macOS/Linux
> ren npmrc.txt .npmrc  # Windows
> ```

---

## CLI Reference

| Command | Description |
|---------|-------------|
| `init` | Interactive wizard — create `project-aliases.md` |
| `install` | Install alias section into all detected AI tool configs |
| `install claude` | Claude Code only — updates CLAUDE.md + .claude/rules/ |
| `install codex` | Codex CLI only — updates AGENTS.md |
| `install gemini` | Gemini CLI only — updates GEMINI.md |
| `install --force` | Overwrite existing alias blocks |
| `status` | Show what alias configs are installed and where |
| `validate` | Check that all referenced aliases are defined |
| `update` | Re-sync installed files (preserves custom tables) |
| `update --force` | Re-sync + overwrite existing alias tables |
| `help` | Show help |

---

## Templates

Ready-to-use templates in `templates/`:

| Template | Location | AI Tool |
|----------|----------|---------|
| Claude Code | `templates/claude/CLAUDE.md` | Claude Code |
| Claude rules | `templates/claude/project-aliases.md` | Claude Code |
| Codex CLI | `templates/codex/AGENTS.md` | OpenAI Codex |
| Gemini CLI | `templates/gemini/GEMINI.md` | Google Gemini |

Copy any template directly to your project and fill in your alias table — no CLI required.

---

## Customizing

See [`docs/CUSTOMIZING.md`](docs/CUSTOMIZING.md) for:
- Adding custom symbol types
- Per-team alias conventions
- Monorepo patterns (shared root vs per-package alias files)
- CI validation (fail the build if an alias is used but not defined)

---

## Philosophy

See [`docs/PHILOSOPHY.md`](docs/PHILOSOPHY.md) for the design rationale: why these 6 symbols, why not prose tags, and how alias density affects LLM context quality.

---

## Contributing

See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

---

## License

MIT — use freely, adapt for your team.
