# Design Philosophy

## The Problem

AI coding assistants require context. The more complex your project, the more context you need to provide — and you end up repeating yourself constantly:

> "In `packages/underground-api/` — that's the Hono TypeScript Cloudflare Worker that handles all the API routes for the social platform — there's a bug in..."

You say this fifty times a session. The AI hears it fifty times. Tokens burn. Attention dilutes.

---

## Why Symbols?

Symbols were chosen over words for three reasons:

**1. No collision with natural language.**

The `@` character doesn't appear naturally in prose about code. `$` is currency. `#` is markdown headers or hashtags. `%` is percentages. `&` is "and." These are already overloaded — but in prompts, they're consistently used as prefix markers, which makes parsing unambiguous.

Words don't work as well. "API" could mean anything. "Service" is too generic. Symbols carry zero ambiguity.

**2. Pattern-matching is fast for both humans and AI.**

When you see `@API` your brain instantly resolves it to your API package — no reading required. Same for the AI: it learns the symbol table once and resolves it instantly on every subsequent use.

**3. Density without loss.**

`@UndergroundAPI #Auth %D1` carries the same information as three sentences, in six tokens. Prompt compression matters for model attention and cost.

---

## Why These Six Symbols?

The six categories were designed to cover every reference type that appears in software development prompts:

| Symbol | Covers | Why separate? |
|--------|--------|---------------|
| `@` | Code entities | Where does the work happen? |
| `$` | External deps | What are we integrating with? |
| `#` | Problems/domains | What is the work about? |
| `&` | People/teams | Who cares about this? |
| `%` | Data/assets | What data is involved? |
| `~` | Automation | What non-human actors are involved? |

These six cover ~95% of context references in practice. The remaining 5% (e.g., specific file paths, exact function names) is better expressed literally.

---

## The Contract

The alias system creates a two-sided contract:

**Developer side:** Maintain a single alias table. Add aliases when you add new entities. Never let the table go stale.

**AI side:** Read the alias table at session start. Resolve symbols to their definitions in every response. Never ask "what does @API mean?" once the table is loaded.

This is the core productivity gain: you define the vocabulary once, and the AI applies it consistently across every interaction in the session — and every future session that loads the same config file.

---

## Tradeoffs

**What this buys you:**
- ~40-60% shorter prompts for routine tasks
- Zero context re-injection overhead per request
- Consistent vocabulary between developer and AI
- Grep-able conversation history (search your logs for `@API` and find everything)
- Tool-agnostic (Claude, Codex, Gemini, ChatGPT — any text input)

**What this costs you:**
- Maintaining the alias table (low cost — add an alias when you add a new entity)
- Onboarding new team members (the table itself is the onboarding doc)
- Symbol resolution overhead on first session load (negligible)

**When it doesn't help:**
- Projects with fewer than ~5 named entities (just use full names)
- One-off queries where context re-injection isn't needed
- When working with an AI that doesn't support persistent system prompts

---

## Naming Conventions

**PascalCase for all aliases.** This distinguishes aliases from natural language and makes them easy to spot in prompts.

```
@UndergroundAPI  ✓
@underground-api ✗
@undergroundapi  ✗
```

**One meaning per symbol.** Overloading destroys the value:

```
@API    (always the main API)     ✓
@API    (sometimes the main API, sometimes the admin API)  ✗
```

**No spaces.** Aliases are single tokens. A space breaks the symbol.

**Abbreviate deliberately.** `@API` is fine. `@U` is too short. `@UndergroundSocialMusicPlatformAPI` is too long. Aim for 4-15 characters.

---

## Relationship to CLAUDE.md, AGENTS.md, GEMINI.md

These AI config files are the natural home for the alias table because:

1. They're read at session start — the AI has the table before the first prompt
2. They're version-controlled — the table evolves with the project
3. They're already the "context injection" mechanism — aliases are just structured context

The alias system doesn't require a special format. It's just a markdown table in a file the AI already reads.
