# Passphrase gate — setup & rollout (Cloudflare Pages)

This repo now contains a **server-enforced shared-passphrase gate** for the site. It is
inert on GitHub Pages (which can't run it) and only activates once the site is served by
**Cloudflare Pages**.

## What was added
- `functions/_middleware.js` — the gate. Runs on every request: shows an unlock page to
  visitors without a valid cookie, verifies the passphrase server-side, sets a signed
  `HttpOnly; Secure; SameSite=Lax` cookie (30-day expiry), rate-limits failed attempts,
  and handles `/__gate/lock`. No secret is stored in code.
- `wrangler.jsonc` — Cloudflare Pages config (build output = repo root).
- `.gitignore` — keeps local wrangler state / `.dev.vars` out of git.

Verified locally: 18/18 checks pass (unlock page leaks no content, wrong→error,
correct→signed cookie, valid cookie serves the site, tampered/expired/forged cookies
rejected, 8 fails→`429`, lock clears the cookie, fail-closed when the secret is missing).

## Bindings you must set in Cloudflare (never in this repo)
- `SITE_PASSPHRASE` — **secret**: the class passphrase (a memorable multiword phrase).
- `GATE_KV` — a **KV namespace** binding (stores per-IP failed-attempt counters).

---

## Step 1 — Create the Cloudflare Pages project (site stays owner-only)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** →
   choose `jnazorr/igsmaths`, production branch **`main`**.
2. Build settings: **Framework preset = None**, **Build command = (leave empty)**,
   **Build output directory = `/`**. Save & Deploy.
3. Create the KV namespace: **Workers & Pages → KV → Create namespace**, e.g.
   `igsmaths-gate`.
4. Pages project → **Settings → Functions → KV namespace bindings** → add
   **Variable name `GATE_KV`** → select that namespace. Add it for **Production and
   Preview**.
5. Pages project → **Settings → Variables and Secrets** → **Add → Secret** →
   name `SITE_PASSPHRASE`, value = your passphrase. Add for **Production and Preview**.
6. **Re-deploy** (Deployments → Retry/redeploy) so the secret + binding take effect.

## Step 2 — Test on the unlisted `*.pages.dev` URL (still not shared with students)
Open the project's `*.pages.dev` address and confirm:
- First visit → unlock page (nothing else loads).
- Wrong phrase → "that passphrase wasn't right"; after ~8 wrong tries → temporary block.
- Correct phrase → the whole site loads. Spot-check: a lesson page
  (`/y12-methods/13D-mean-variance-sd/`), one of its **videos**, and a **micro:bit page**
  (`/y7-digitech/microbit-challenge-creator.html`) whose editor iframe must still load.
- Visit `/__gate/lock` → you're locked out again (cookie cleared).

*(Optional local run, when the npm registry is healthy:*
`npx wrangler pages dev --kv GATE_KV --binding SITE_PASSPHRASE=testpass123` *→ browse
`http://localhost:8788`. Note: browsers won't store a `Secure` cookie over plain http on
localhost, so use the `pages.dev` preview for full browser testing.)*

## Step 3 — Cutover (this is the step that makes the gate reachable to students)
Only after you're happy with Step 2, and with your explicit go-ahead:
1. Pages project → **Custom domains → Set up a custom domain** → `igsmaths.jeffwo.ng`
   (DNS updates automatically since the zone is already on Cloudflare). This moves the
   domain from GitHub Pages to Cloudflare Pages.
2. **Disable GitHub Pages** so `jnazorr.github.io/igsmaths` can't bypass the gate: GitHub
   repo → **Settings → Pages → Source = None** (or delete
   `.github/workflows/pages.yml`).
3. **Make the repo private**: GitHub repo → **Settings → General → Change repository
   visibility → Private**. (Re-authorise the Cloudflare Pages GitHub app for private-repo
   access if prompted; it keeps auto-deploying on push.)

## Rotating the passphrase
Update the `SITE_PASSPHRASE` secret and redeploy. Because the cookie signing key is
derived from the passphrase, **every existing cookie is invalidated instantly** — do this
each term.

## Limitations (by design)
A shared passphrase is forwardable, can't revoke a single student without rotating for
everyone, and is unsuitable for grades, personal information, or submissions. Use a
memorable multiword phrase and rotate it each term. `/__gate/lock` re-locks on demand.
