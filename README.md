# ai-alias-system

> A symbol-shorthand notation system for directing AI coding assistants with compact project context.

Works with **Claude Code**, **OpenAI Codex CLI**, and **Google Gemini CLI**.

---

## What is This?

When you give an AI coding assistant context about your project, you're constantly repeating yourself:

```
"In the underground-api package, which is a Hono CF Worker at packages/underground-api/..."
```

The alias system replaces those long-form references with compact symbols:

```
"In @UndergroundAPI..."
```

Six symbols. One vocabulary. Works across every AI tool you use.

---

## The Six Symbols

| Symbol | Meaning | Example |
|--------|---------|---------|
| `@` | Project / repository / sub-package | `@UndergroundAPI`, `@FrxncoisLanding` |
| `$` | External service / third-party client | `$Cloudflare`, `$Stripe`, `$GitHub` |
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

Or with npm/npx:

```bash
npx ai-alias-system install
```

---

## What Gets Installed

### Claude Code
- Appends an alias section to your project's `CLAUDE.md`
- Creates `.claude/rules/project-aliases.md` with a customizable table
- Adds the `@rules/project-aliases.md` import to your CLAUDE.md

### Codex CLI (OpenAI)
- Creates or updates `AGENTS.md` in your project root
- Adds the alias table under a clearly marked block

### Gemini CLI (Google)
- Creates or updates `GEMINI.md` in your project root
- Adds the alias table under a clearly marked block

---

## How to Define Your Aliases

After running `pnpm dlx ai-alias-system init`, you'll get a `project-aliases.md` (or equivalent) with empty tables to fill in:

```markdown
## @ Projects

| Alias | Repo / Path | Description |
|-------|-------------|-------------|
| @API  | src/api/    | Express API server |
| @Web  | src/web/    | Next.js frontend  |

## $ External Services

| Alias    | Service  | Notes              |
|----------|----------|--------------------|
| $Stripe  | Stripe   | Payments           |
| $Supabase| Supabase | Database + Auth    |

## # Topics

| Alias   | Scope                  |
|---------|------------------------|
| #Auth   | Authentication flows   |
| #Billing| Stripe + subscriptions |
```

Then use these aliases directly in your prompts:

```
Fix the 401 error in @API's #Auth middleware — it's hitting $Supabase wrong.
```

---

## Example Prompts

**Without aliases:**
```
In the packages/underground-api Hono CF Worker, in the authentication 
routes file, there's a bug with how the JWT refresh token rotation 
interacts with Cloudflare D1...
```

**With aliases:**
```
In @UndergroundAPI #Auth, there's a bug with JWT refresh token rotation 
hitting %D1...
```

Same information. 60% fewer words. No ambiguity.

---

## Why Symbols?

- **Compact** — `@UndergroundAPI` vs `packages/underground-api/` (a Hono CF Worker deployed to...)
- **Unambiguous** — symbols don't conflict with natural language
- **Tool-agnostic** — works in Claude, Codex, Gemini, ChatGPT, any text input
- **Learnable** — the AI learns your symbols from the table once; you never re-explain
- **Grep-able** — `grep -r "@UndergroundAPI"` in your conversation history finds everything

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

### Global install (optional)

```bash
pnpm add -g ai-alias-system

# Then use the short alias anywhere:
aias install
aias init
aias status
```

---

## CLI Reference

| Command | Description |
|---------|-------------|
| `init` | Interactive wizard — creates `project-aliases.md` |
| `install` | Install alias section into all detected AI tool configs |
| `install claude` | Claude Code only — updates CLAUDE.md + .claude/rules/ |
| `install codex` | Codex CLI only — updates AGENTS.md |
| `install gemini` | Gemini CLI only — updates GEMINI.md |
| `status` | Show what alias configs are installed and where |
| `update` | Pull latest template version + re-sync installed files |
| `validate` | Check that all referenced aliases are defined |

---

## Templates

Ready-to-use templates live in `templates/`:

| Template | Location | AI Tool |
|----------|----------|---------|
| Claude Code | `templates/claude/CLAUDE.md` | Claude Code |
| Claude rules | `templates/claude/project-aliases.md` | Claude Code |
| Codex CLI | `templates/codex/AGENTS.md` | OpenAI Codex |
| Gemini CLI | `templates/gemini/GEMINI.md` | Google Gemini |

You can use these templates directly without the CLI:
1. Copy the template to your project
2. Fill in your alias table
3. Done

---

## Customizing

See [`docs/CUSTOMIZING.md`](docs/CUSTOMIZING.md) for:
- Adding custom symbol types
- Per-team alias conventions
- Monorepo patterns (one alias file per package vs. shared root)
- CI validation (fail the build if an alias is used but not defined)

---

## Philosophy

See [`docs/PHILOSOPHY.md`](docs/PHILOSOPHY.md) for the design rationale behind symbol choice, naming conventions, and why this outperforms prose-based context injection.

---

## Contributing

See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

---

## License

MIT — use freely, adapt for your team.
