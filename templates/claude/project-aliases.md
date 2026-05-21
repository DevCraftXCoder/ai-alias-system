# Project Aliases — [YOUR PROJECT NAME]

> Symbol shorthand for AI coding assistants. One definition, used everywhere.
> See https://github.com/DevCraftXCoder/ai-alias-system for full docs.

---

## Symbol Legend

```
@  = project/repo/sub-package
$  = external service/client
#  = topic/workstream/feature area
&  = team/role/domain
%  = asset/resource/data store
~  = agent/bot/automated system
```

---

## @ Projects

| Alias | Repo / Path | Description | Visibility |
|-------|-------------|-------------|------------|
| @API  | packages/api/ | [Your API service] | Private |
| @Web  | apps/web/     | [Your frontend]    | Private |

<!-- Add more @ aliases here -->

---

## $ External Services

| Alias | Service | Notes |
|-------|---------|-------|
| $Stripe | Stripe | Payments |
| $Supabase | Supabase | Database + Auth |

<!-- Add more $ aliases here -->

---

## # Topics / Workstreams

| Alias | Scope |
|-------|-------|
| #Auth | Authentication, tokens, sessions |
| #Feed | Content feed, pagination |

<!-- Add more # aliases here -->

---

## & Teams / Roles

| Alias | Scope |
|-------|-------|
| &Backend | API, database, infra |
| &Frontend | Web, mobile, UI |

<!-- Add more & aliases here -->

---

## % Assets / Resources

| Alias | Location / Service |
|-------|--------------------|
| %DB | [Your database] |
| %Cache | [Your cache layer] |

<!-- Add more % aliases here -->

---

## ~ Agents / Bots

| Alias | Agent / Tool | Purpose |
|-------|--------------|---------|
| ~QAAgent | qa-agent | Typecheck + tests |
| ~Deployer | deploy script | CI/CD automation |

<!-- Add more ~ aliases here -->

---

## Rules

1. One meaning per alias — never overload
2. PascalCase always
3. No spaces in alias names
4. Update this table when you add new entities
5. Run `pnpm dlx ai-alias-system validate` to check for undefined aliases
