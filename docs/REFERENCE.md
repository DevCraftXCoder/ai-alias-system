# Alias System — Full Reference

## Overview

The alias system uses six symbol prefixes to create a shared vocabulary between you and your AI coding assistant. Once defined in a config file, the AI understands these symbols in any prompt — no re-explanation needed.

---

## @ — Projects and Repositories

The `@` prefix marks code-level entities: repositories, packages, apps, services, or any directory that has an identity in your architecture.

**Use for:**
- Monorepo sub-packages (`@API`, `@Web`, `@Mobile`)
- Standalone repositories (`@AdminDashboard`, `@LandingSite`)
- Services with a deployment identity (`@AuthWorker`, `@CDNEdge`)
- Named sub-directories that carry semantic meaning

**Naming conventions:**
- PascalCase (`@UndergroundAPI`, `@FrxncoisLanding`)
- Abbreviate well-known packages (`@API` not `@ApiPackage`)
- Include domain context when ambiguous (`@AdminAPI` vs `@UserAPI`)

**Template entry:**
```markdown
| Alias     | Repo / Path              | Description                    | Visibility |
|-----------|--------------------------|--------------------------------|------------|
| @API      | packages/api/            | Hono CF Worker — all API routes | Private |
| @Web      | apps/web/                | Next.js 15 frontend             | Private |
```

---

## $ — External Services

The `$` prefix marks third-party services, APIs, and external dependencies — anything outside your codebase that your code talks to.

**Use for:**
- Cloud providers (`$AWS`, `$Cloudflare`, `$Vercel`)
- SaaS APIs (`$Stripe`, `$Twilio`, `$SendGrid`)
- Databases-as-a-service (`$Supabase`, `$PlanetScale`, `$MongoDB`)
- Auth providers (`$Auth0`, `$Clerk`, `$Firebase`)
- Monitoring (`$Sentry`, `$Datadog`, `$PagerDuty`)

**Naming conventions:**
- PascalCase matching the service name
- Use canonical name (`$Stripe`, not `$StripePayments`)
- Add suffix only for disambiguation (`$SupabaseAuth` vs `$SupabaseStorage`)

**Template entry:**
```markdown
| Alias      | Service   | Notes                          |
|------------|-----------|--------------------------------|
| $Stripe    | Stripe    | Subscriptions + checkout       |
| $Cloudflare| Cloudflare| Workers, D1, R2, KV, Tunnels   |
```

---

## # — Topics and Workstreams

The `#` prefix marks conceptual areas: features, domains, ongoing concerns, or categories of work. Unlike `@` (which maps to code), `#` maps to problems and capabilities.

**Use for:**
- Feature areas (`#Auth`, `#Feed`, `#Search`, `#Upload`)
- Cross-cutting concerns (`#Performance`, `#Security`, `#Monitoring`)
- Active workstreams (`#MigrationV2`, `#MobileRewrite`)
- Domain groupings (`#Payments`, `#Social`, `#Content`)

**Naming conventions:**
- PascalCase
- Use noun or compound noun (`#Auth`, `#FeedPagination`)
- Avoid verbs — use the domain name, not the action

**Template entry:**
```markdown
| Alias       | Scope                                     |
|-------------|-------------------------------------------|
| #Auth       | Authentication, tokens, OAuth flows       |
| #Feed       | Timeline, pagination, RSS                 |
| #Payments   | Stripe subscriptions, webhooks            |
```

---

## & — Teams and Roles

The `&` prefix marks human teams, responsibility domains, or organizational roles. Most useful in multi-team projects or when directing AI output toward a specific audience.

**Use for:**
- Engineering teams (`&Backend`, `&Frontend`, `&Platform`)
- Role-based audiences (`&Design`, `&QA`, `&Security`)
- Responsibility boundaries (`&Infra`, `&DataEng`)
- Review contexts (`"Write this for &Backend to review"`)

**Naming conventions:**
- PascalCase
- Keep broad (`&Backend` not `&BackendTeam`)

**Template entry:**
```markdown
| Alias    | Scope                                        |
|----------|----------------------------------------------|
| &Backend | API, database, infra                         |
| &Frontend| Web, mobile, UI components                   |
| &Infra   | Docker, CI/CD, cloud, networking             |
```

---

## % — Assets and Resources

The `%` prefix marks infrastructure resources, data stores, and persistent assets — things that hold data or state.

**Use for:**
- Databases (`%DB`, `%Redis`, `%D1`)
- Object storage (`%S3`, `%R2`, `%GCS`)
- CDN / edge cache (`%CDN`, `%Cache`)
- Message queues (`%Queue`, `%Kafka`)
- Static assets (`%Assets`, `%Media`)

**Naming conventions:**
- Short, 1-3 char preferred (`%DB`, `%S3`, `%KV`)
- Add context when there are multiple of the same type (`%UserDB` vs `%AnalyticsDB`)

**Template entry:**
```markdown
| Alias   | Location / Service              |
|---------|---------------------------------|
| %DB     | Cloudflare D1 (SQLite)          |
| %R2     | Cloudflare R2 (object storage)  |
| %Cache  | Upstash Redis                   |
```

---

## ~ — Agents and Bots

The `~` prefix marks automated systems, AI agents, bots, or any non-human actor that takes actions in your project.

**Use for:**
- CI/CD bots (`~Deployer`, `~TestRunner`)
- AI sub-agents (`~QAAgent`, `~SecurityReviewer`)
- Scheduled tasks (`~CronWorker`)
- Monitoring bots (`~AlertBot`, `~UptimeMonitor`)

**Naming conventions:**
- PascalCase
- Use the role/purpose, not the tool name (`~QAAgent` not `~ViTest`)

**Template entry:**
```markdown
| Alias       | Agent / Tool         | Purpose                     |
|-------------|----------------------|-----------------------------|
| ~QAAgent    | qa-agent             | tsc + lint + curl checks    |
| ~ImplExpert | implementation-expert| Feature dev + bug fixes     |
| ~Deployer   | CF Workers deploy    | Automated deploys via hook  |
```

---

## Putting It Together

A well-defined alias table unlocks prompts like:

```
@API has a bug in #Auth — the JWT refresh is hitting %DB with the wrong query.
Ask ~ImplExpert to fix it. The affected $Cloudflare D1 schema is in migration-042.sql.
```

The AI has full context. You wrote 30 words instead of a paragraph.

---

## Rules

1. **Define once** — put your alias table in the AI config file, not in every prompt.
2. **One meaning per symbol** — never overload (`@API` is always the same service).
3. **No spaces in aliases** — use PascalCase or camelCase.
4. **Prefer existing symbols** — check your table before adding a new alias.
5. **Keep the table in version control** — it's part of your project's context layer.
