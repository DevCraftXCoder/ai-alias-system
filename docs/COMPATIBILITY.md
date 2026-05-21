# Tool Compatibility Notes

## Claude Code

**Config file:** `CLAUDE.md` (project root) + `.claude/rules/project-aliases.md`

**How Claude reads aliases:**
- CLAUDE.md is loaded at every session start automatically
- `.claude/rules/*.md` files are imported via `@rules/filename.md` in CLAUDE.md
- Claude resolves alias tokens inline — no special syntax needed

**Best practice:**
```markdown
<!-- In CLAUDE.md -->
@rules/project-aliases.md
```

**Limitations:**
- CLAUDE.md has no formal max size, but keep under ~100KB for reliable context inclusion
- Claude Code does not validate undefined aliases — it may hallucinate resolution

**Install behavior:**
```bash
pnpm dlx ai-alias-system install claude
# → Appends to CLAUDE.md
# → Creates .claude/rules/project-aliases.md
```

---

## OpenAI Codex CLI

**Config file:** `AGENTS.md` (project root)

**How Codex reads aliases:**
- AGENTS.md is the Codex CLI equivalent of CLAUDE.md
- Loaded at session start, applies to the entire session
- Codex resolves alias tokens if the table is clearly formatted

**Best practice — AGENTS.md alias block:**
```markdown
<!-- ALIAS SYSTEM — DO NOT REMOVE THIS BLOCK -->
## Project Aliases

[alias table here]

<!-- END ALIAS SYSTEM -->
```

The CLI comment markers ensure the block survives manual edits to AGENTS.md.

**Limitations:**
- Codex CLI (`codex` command) reads AGENTS.md from the current working directory
- Nested AGENTS.md (in subdirectories) are read for workspace context but the root AGENTS.md has priority
- Large alias tables may be truncated in shorter context window modes

**Install behavior:**
```bash
pnpm dlx ai-alias-system install codex
# → Creates/updates AGENTS.md with alias block
```

---

## Google Gemini CLI

**Config file:** `GEMINI.md` (project root)

**How Gemini reads aliases:**
- GEMINI.md is the Gemini CLI equivalent
- Loaded at session start
- Resolution quality depends on model version

**Best practice — GEMINI.md alias block:**
```markdown
<!-- ALIAS SYSTEM -->
## Alias Vocabulary

[alias table here]

<!-- END ALIASES -->
```

**Limitations:**
- Gemini CLI may not resolve aliases as reliably as Claude Code — provide the full name once if the model seems confused
- GEMINI.md support is available in Gemini CLI 1.0+
- Very large alias tables (200+ entries) may reduce context available for code

**Install behavior:**
```bash
pnpm dlx ai-alias-system install gemini
# → Creates/updates GEMINI.md with alias block
```

---

## Other AI Tools

The alias system works with any AI that reads a system prompt or project instructions file:

| Tool | Config file | Notes |
|------|-------------|-------|
| GitHub Copilot | `.github/copilot-instructions.md` | Paste the alias table here |
| Cursor | `.cursor/rules/` | Create an alias file there |
| Windsurf | `WINDSURF.md` or `.windsurf/rules/` | Follows same pattern |
| ChatGPT | Custom Instructions | Paste the alias table in "What would you like ChatGPT to know?" |
| Ollama (local) | System prompt | Include the alias table in your system prompt |

For tools without a built-in project instructions file, include the alias table in your initial message:

```
Here is my project alias table:
[paste table]

Now: fix the bug in @API #Auth...
```

---

## Cross-Tool Sync

If you use multiple AI tools on the same project, keep the alias tables in sync. The `update` command re-syncs all installed files from the canonical `project-aliases.md`:

```bash
pnpm dlx ai-alias-system update
```

This reads your `.claude/rules/project-aliases.md` as the source of truth and writes the alias block into AGENTS.md, GEMINI.md, and any other configured targets.
