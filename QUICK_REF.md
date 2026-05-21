# AI Alias System — Quick Reference

## Symbol Table

```
@  project / repo / sub-package       @API  @Web  @MyService
$  external service / client          $Stripe  $GitHub  $Redis
#  topic / workstream / feature       #Auth  #Feed  #Payments
&  team / role / domain               &Backend  &Design  &Infra
%  asset / resource / data store      %S3  %DB  %Cache
~  agent / bot / automated system     ~QABot  ~Deployer
```

## Install (pick one)

```bash
pnpm dlx ai-alias-system install    # all tools
pnpm dlx ai-alias-system install claude
pnpm dlx ai-alias-system install codex
pnpm dlx ai-alias-system install gemini

npx ai-alias-system install         # npm fallback
aias install                        # if installed globally
```

## Config files installed

| AI Tool | File written |
|---------|-------------|
| Claude Code | `.claude/rules/project-aliases.md` + CLAUDE.md update |
| Codex CLI | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |

## Prompt patterns

```
Fix the bug in @API's #Auth flow that hits $Stripe wrong.
Optimize the %DB query in @API — see #Performance.
Ask ~QABot to run the test suite on @Web.
```

## Define your aliases

Edit `.claude/rules/project-aliases.md` (or AGENTS.md / GEMINI.md):

```markdown
| @API    | src/api/    | Express API  |
| $Stripe | Stripe      | Payments     |
| #Auth   | Auth flows  |              |
```

## Validate

```bash
pnpm dlx ai-alias-system validate   # check all used aliases are defined
```
