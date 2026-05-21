# Customizing the Alias System

## Starting from the Template

Run the wizard to get a pre-filled starting point:

```bash
pnpm dlx ai-alias-system init
```

This creates a `project-aliases.md` with empty tables and a `CLAUDE.md` / `AGENTS.md` / `GEMINI.md` snippet.

---

## Adding Your Aliases

Fill in the tables with your actual project entities:

```markdown
## @ Projects

| Alias     | Repo / Path         | Description              | Visibility |
|-----------|---------------------|--------------------------|------------|
| @API      | packages/api/       | Hono REST API            | Private    |
| @Web      | apps/web/           | Next.js frontend         | Private    |
| @Workers  | cloudflare/workers/ | CF Edge Workers          | Private    |

## $ External Services

| Alias      | Service    | Notes                          |
|------------|------------|--------------------------------|
| $Stripe    | Stripe     | Subscriptions + webhooks       |
| $AWS       | AWS        | S3 + Lambda                    |
| $Sentry    | Sentry     | Error tracking                 |

## # Topics

| Alias      | Scope                               |
|------------|-------------------------------------|
| #Auth      | JWT, OAuth, sessions                |
| #Upload    | File upload, storage, CDN           |
| #Billing   | Stripe, invoices, subscriptions     |
```

---

## Monorepo Patterns

### One shared alias file (recommended for small teams)

```
root/
  .claude/
    rules/
      project-aliases.md   ← single source of truth
  AGENTS.md                ← includes the alias table
  GEMINI.md                ← includes the alias table
```

All developers use the same alias table. Merge conflicts are the signal to discuss naming.

### Per-package alias files (for large monorepos)

```
root/
  .claude/rules/project-aliases.md   ← global aliases only
  packages/api/
    .claude/rules/api-aliases.md     ← API-specific aliases
  packages/web/
    .claude/rules/web-aliases.md     ← Web-specific aliases
```

Import per-package aliases in the package's CLAUDE.md:

```markdown
@rules/project-aliases.md
@rules/api-aliases.md
```

---

## Custom Symbol Types

The default system uses `@ $ # & % ~`. You can extend it with any character that doesn't appear naturally in your prose. Some teams add:

| Symbol | Suggested meaning |
|--------|------------------|
| `^` | Environment / deployment target |
| `!` | Known bug / issue (reference) |
| `*` | Wildcard / any |

Add your custom types to the alias table with a comment explaining the convention.

---

## CI Validation

Prevent undefined aliases from appearing in documentation or prompts:

```bash
# package.json
"scripts": {
  "validate-aliases": "pnpm dlx ai-alias-system validate"
}
```

The validate command scans your project's `*.md` files for `@`, `$`, `#`, `%`, `~` prefixed tokens and checks them against your alias table. Any undefined alias fails the check.

Add to CI:

```yaml
# .github/workflows/validate.yml
- name: Validate aliases
  run: pnpm dlx ai-alias-system validate
```

---

## Keeping the Table Fresh

Common signals that your alias table needs updating:

1. You find yourself explaining a project entity in a prompt instead of using `@`
2. A new service goes to production but isn't in `$`
3. A sub-package is renamed and the old alias is stale
4. You add a new AI agent but it's not in `~`

Best practice: add the alias at the same time you create the entity. Make it part of your new-entity checklist.

---

## Team Onboarding

The alias table is your fastest onboarding document. New team members read it and immediately understand:

- What repositories exist (`@`)
- What external services the project depends on (`$`)
- What the major feature areas are (`#`)
- Who owns what (`&`)
- What data stores exist (`%`)
- What automation runs (`~`)

Pin it to your team wiki or README.

---

## Alias Table Length

Keep the total alias table under 200 entries. Past that, the AI's context window allocation for the table becomes significant. If you exceed 200:

1. Split into global + per-package tables
2. Prune stale entries (old services, renamed packages)
3. Merge aliases that represent the same thing
