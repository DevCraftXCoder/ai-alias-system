# Alias System — Example Prompts

Real-world prompt patterns showing the alias system in action. Each example shows the verbose version and the alias version side-by-side.

---

## Bug Reports

**Without aliases:**
```
There's a bug in the packages/underground-api Hono CF Worker's authentication
routes where the JWT refresh token rotation is causing a D1 database error.
The error started after the last Cloudflare D1 migration.
```

**With aliases:**
```
Bug in @API #Auth — JWT refresh is throwing a D1 error after the last %DB migration.
```

---

## Feature Requests

**Without aliases:**
```
In the packages/underground-api Hono CF Worker, add a new feed endpoint that
returns posts from followed users. It should use cursor pagination and be
gated behind the JWT authentication middleware. Also notify the Next.js
frontend in francois-landing/ that the endpoint is available.
```

**With aliases:**
```
Add a #Feed endpoint to @API — cursor pagination, JWT-gated.
Notify @Landing that it's ready.
```

---

## Deployment Directives

**Without aliases:**
```
Deploy the underground-api Cloudflare Worker using wrangler, then deploy
the francois-landing Next.js app using the deploy.cjs script.
Run health checks on both after deploying.
```

**With aliases:**
```
Deploy @API then @Landing. Run health checks on both.
```

---

## Agent Delegation

**Without aliases:**
```
Spawn the implementation-expert agent to fix the authentication bug in
packages/underground-api/src/routes/auth.ts, then have the qa-agent
run the TypeScript check and vitest tests after it's done.
```

**With aliases:**
```
~ImplExpert: fix the #Auth bug in @API/src/routes/auth.ts.
~QAAgent: tsc + vitest after.
```

---

## Architecture Questions

**Without aliases:**
```
How does the francois-landing Next.js app communicate with the underground-api
Cloudflare Worker? Which authentication headers does it send?
```

**With aliases:**
```
How does @Landing communicate with @API? Which auth headers?
```

---

## External Service Debugging

**Without aliases:**
```
The Stripe webhook in packages/underground-api/src/routes/stripe.ts is
failing to parse the event. The webhook endpoint is at /api/stripe/webhook
and uses the STRIPE_WEBHOOK_SECRET environment variable.
```

**With aliases:**
```
$Stripe webhook in @API/stripe.ts is failing to parse. Env var is STRIPE_WEBHOOK_SECRET.
```

---

## Cross-System Work

**Without aliases:**
```
The EV Betta scraper in EV Betta/ev-betta-scraper/ is not saving picks to
the ev-betta-worker Cloudflare Worker's D1 database. The scraper runs as
a PM2 process and calls the worker's /api/picks/sync endpoint.
```

**With aliases:**
```
@EvBettaScraper isn't saving picks to @EvBettaWorker's %D1.
The scraper calls /api/picks/sync via PM2.
```

---

## Review Requests

**Without aliases:**
```
Can you review the changes I made to the admin dashboard in
francois-landing/components/admin/ and check that the design system
tokens (#0a0a0a backgrounds, #e94560 accent, Syne/DM Sans fonts) are
consistent? The &Design team cares about this.
```

**With aliases:**
```
Review @Landing/components/admin/ changes for &Design token consistency.
```

---

## Multi-Step Task

**Without aliases:**
```
1. In the packages/sso FastAPI service, add an endpoint for MFA setup
2. Update the packages/sso-worker Hono CF Worker to forward MFA requests
3. Update the francois-landing Next.js frontend to show the MFA setup UI
4. Have the qa-agent run the SSO test suite after
```

**With aliases:**
```
1. Add MFA setup endpoint to @SSO
2. Forward MFA requests in @SSOWorker
3. Show MFA setup UI in @Landing
4. ~QAAgent: run SSO tests after
```

---

## With Asset Context

**Without aliases:**
```
The track upload flow uploads audio files to the Cloudflare R2 bucket
using pre-signed URLs, saves the R2 key to the Cloudflare D1 SQLite
database, and then serves the audio via the Cloudflare CDN edge cache.
There's a bug where the R2 key isn't being validated before the D1 write.
```

**With aliases:**
```
#Upload flow: %R2 key isn't validated before %D1 write. Fix in @API/upload.ts.
```

---

## Referencing Agent History

**Without aliases:**
```
The implementation expert agent that fixed the feed pagination bug yesterday
used an approach where it added a compound cursor. Can you check if the
qa-agent's test report from that session is still accurate?
```

**With aliases:**
```
Did ~ImplExpert's compound cursor fix for #Feed pagination hold up?
Check ~QAAgent's last report.
```
