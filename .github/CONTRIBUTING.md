# Contributing to ai-alias-system

## What to Contribute

- New AI tool templates (Cursor, Windsurf, GitHub Copilot, etc.)
- Improvements to the CLI installer
- Additional examples in `docs/EXAMPLES.md`
- Bug fixes in `src/installer.js` or `src/utils.js`
- Translations of README.md

## Repo Structure

```
bin/ai-aliases.js       CLI entry point
src/installer.js        Install logic per tool
src/utils.js            File detection, path helpers
src/prompts.js          Interactive wizard
templates/              Ready-to-use AI config templates
  claude/               Claude Code templates
  codex/                Codex CLI templates
  gemini/               Gemini CLI templates
docs/                   Reference documentation
install/                Shell installer scripts
```

## Adding a New AI Tool

1. Create `templates/<toolname>/<TOOLCONFIG>.md` with the alias block
2. Add `install<ToolName>()` function in `src/installer.js`
3. Wire into `installAll()` and `getStatus()`
4. Add CLI subcommand in `bin/ai-aliases.js`
5. Add entry in `docs/COMPATIBILITY.md`
6. Update README.md Quick Install table

## Code Style

- CommonJS (`require`) — no ESM
- No external dependencies in `src/` — standard library only
- Node.js 18+ APIs only
- Add a short comment if a function is non-obvious

## Pull Requests

- One feature or fix per PR
- Include a `docs/EXAMPLES.md` example if adding a new capability
- Test manually: `node bin/ai-aliases.js install` in a temp directory

## Issues

Use GitHub Issues for:
- Bug reports (include Node.js version + OS)
- New AI tool requests (link to the tool's config file docs)
- Template improvements
