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
"In the packages/underground-api package — that's the Hono CF Worker backend,
TypeScript, deployed on Cloudflare Workers with D1 as the database..."
```

You repeat this dozens of times per week. The AI forgets between sessions. You re-type the same context constantly.

The alias system fixes this once.

---

## The Solution

Define a vocabulary once. Use compact symbols in every prompt from then on.

```
In @UndergroundAPI #Auth, there's a bug with JWT refresh token rotation hitting %D1.
```

The AI already knows what each symbol means — no re-explanation needed.

---

## The Six Symbols

| Symbol | Meaning | Example |
|--------|---------|---------|
| `@` | Project / repository / sub-package | `@UndergroundAPI`, `@SIC`, `@Finos` |
| `$` | External service / third-party API | `$Cloudflare`, `$Stripe`, `$Anthropic` |
| `#` | Topic / workstream / feature area | `#Auth`, `#Feed`, `#Payments` |
| `&` | Team / role / responsibility domain | `&Backend`, `&Design`, `&Infra` |
| `%` | Asset / resource / data store | `%R2`, `%D1`, `%Redis` |
| `~` | Agent / bot / automated system | `~ImplExpert`, `~QAAgent` |

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

### Example — Monorepo (multiple sub-packages)

```markdown
## @ Projects

| Alias            | Repo / Path               | Description                              |
|------------------|---------------------------|------------------------------------------|
| @App             | (root)                    | Main monorepo                            |
| @API             | packages/api/             | Hono CF Worker — all backend routes      |
| @Web             | packages/web/             | Next.js 15 frontend                      |
| @Desktop         | packages/desktop/         | Tauri 2.x desktop app                   |

## $ External Services

| Alias       | Service    | Notes                              |
|-------------|------------|------------------------------------|
| $Cloudflare | Cloudflare | Workers, D1, R2, KV, Durable Obj   |
| $Stripe     | Stripe     | Subscriptions, checkout, webhooks  |
| $Anthropic  | Anthropic  | Claude API — claude-opus-4-7       |

## # Topics

| Alias     | Scope                                      |
|-----------|--------------------------------------------|
| #Auth     | JWT, OAuth, token rotation, session mgmt   |
| #Feed     | Timeline, pagination, recommendations      |
| #Payments | Stripe subscriptions, checkout flows       |

## % Assets / Resources

| Alias | Location              |
|-------|-----------------------|
| %D1   | Cloudflare D1 (SQLite)|
| %R2   | Cloudflare R2 storage |
| %KV   | Cloudflare Workers KV |
```

Then use it:

```
Fix the 401 in @API #Auth — the JWT middleware isn't passing userId to route handlers.

Optimize the @Web #Feed query — cursor pagination hits %D1 too slowly at scale.

Stripe $Stripe webhook isn't updating the @API #Payments tier on subscription renewal.
```

### Example — Single repo

```markdown
## @ Projects

| Alias | Repo / Path | Description  |
|-------|-------------|--------------|
| @App  | (root)      | This project |

## $ External Services

| Alias    | Service  | Notes           |
|----------|----------|-----------------|
| $Supabase| Supabase | DB + Auth        |
| $Vercel  | Vercel   | Deploy + preview |

## # Topics

| Alias    | Scope              |
|----------|--------------------|
| #Auth    | Supabase auth flow |
| #API     | Route handlers     |
```

---

## Real-World Example

Here's a real alias table from a production monorepo — [Underground Social](https://github.com/DevCraftXCoder/Underground-Social), a social music platform for independent artists:

```markdown
## @ Projects

| Alias            | Path                          | Description                              |
|------------------|-------------------------------|------------------------------------------|
| @App             | (root)                        | Main monorepo — C:/Za                   |
| @UndergroundAPI  | packages/underground-api/     | Hono CF Worker — 150+ API routes         |
| @FrxncoisLanding | francois-landing/             | Next.js 15 landing + admin dashboard     |
| @EvBettaWorker   | EV Betta/ev-betta-worker/     | Sports picks CF Worker                   |
| @EvBettaScraper  | EV Betta/ev-betta-scraper/    | PM2 TypeScript odds scraper              |
| @SIC             | sic/                          | AI pentesting MCP framework (150+ tools) |
| @Finos           | packages/finos/apps/web/      | AI Financial OS — Next.js 15             |
| @MizzyTools      | mizzy-tools/                  | Self-hosted creator dashboard            |
| @SSO             | packages/sso/                 | FastAPI + PostgreSQL OAuth 2.0 server    |

## $ External Services

| Alias       | Service    | Notes                                    |
|-------------|------------|------------------------------------------|
| $Cloudflare | Cloudflare | Workers, D1, R2, KV, Durable Objects     |
| $Stripe     | Stripe     | Underground+ subscriptions + webhooks    |
| $Anthropic  | Anthropic  | claude-opus-4-7, claude-sonnet-4-6       |
| $Ollama     | Ollama     | Local LLM — qwen3:14b, offline fallback  |
| $Discord    | Discord    | Webhook alerts, gateway bot              |

## # Topics

| Alias    | Scope                                         |
|----------|-----------------------------------------------|
| #Auth    | JWT, OAuth (Google/Discord), token rotation   |
| #Feed    | Following feed, all tracks, cursor pagination |
| #Sports  | EV Betta odds scraper, picks engine, EV calc  |
| #Music   | Underground tracks, playlists, HLS streaming  |
| #Payments| Stripe subscriptions, tiers, webhooks         |
| #Deploy  | wrangler, CF Workers deploy, PM2              |
| #Security| SIC, pentesting, OWASP, auth hardening        |

## % Assets / Resources

| Alias      | Location                                  |
|------------|-------------------------------------------|
| %D1        | Cloudflare D1 — all relational data       |
| %R2        | Cloudflare R2 — audio, covers, HLS, backups|
| %DO        | Durable Objects — WebSocket DM rooms      |
| %MemoryMCP | https://frxncois-memory.frxncois.workers.dev|

## ~ Agents

| Alias          | Agent Type             | Domain                      |
|----------------|------------------------|-----------------------------|
| ~ImplExpert    | implementation-expert  | TS/Python feature dev        |
| ~FrontendExpert| frontend-expert        | Next.js 15, admin UI         |
| ~QAAgent       | qa-agent               | tsc, ruff, build, smoke tests|
| ~MasterAuditor | master-auditor         | Full DFE codebase audit      |
```

**In use:**

```
# Without aliases
"In the packages/underground-api Hono CF Worker backend, in the auth route file,
there's a bug with how the JWT refresh token rotation interacts with Cloudflare D1..."

# With aliases
"In @UndergroundAPI #Auth, JWT refresh rotation is broken hitting %D1."
```

Same information. 70% fewer words. No ambiguity.

---

## Prompt Patterns

```
# Bug fix
@UndergroundAPI #Auth — 401 on token refresh, userId not propagating to handlers.

# Feature work
Add cursor pagination to @Finos #Feed — use %D1, pattern matches @UndergroundAPI.

# Cross-service
$Stripe webhook isn't syncing tier to @UndergroundAPI #Payments after subscription renewal.

# Agent dispatch
Spawn ~ImplExpert to fix @EvBettaWorker #Sports — picks sync is silently deleting rows.

# Multi-repo
@FrxncoisLanding admin tab needs to query @UndergroundAPI /api/admin/stats — add the route.

# Deploy
Deploy @EvBettaWorker after #Sports fix — run wrangler deploy on ev-betta-worker.
```

---

## Why Symbols?

**Compact** — `@UndergroundAPI` vs `the packages/underground-api Hono CF Worker backend deployed on Cloudflare Workers`

**Unambiguous** — symbols don't appear in natural language, so they stand out as references

**Tool-agnostic** — works in Claude, Codex, Gemini, ChatGPT, Cursor, any text input

**Learnable** — the AI learns your symbols from the table once per session; you never re-explain

**Grep-able** — `grep -r "@UndergroundAPI"` across your prompt history finds every relevant conversation

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
