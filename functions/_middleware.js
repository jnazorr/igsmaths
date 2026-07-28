/**
 * Server-enforced shared-passphrase gate for the IGS Maths site (Cloudflare Pages).
 *
 * Runs on EVERY request. Unauthenticated visitors only ever receive the self-contained
 * unlock page; the correct passphrase sets a signed, time-limited HttpOnly cookie that
 * is verified server-side on each request. Failed attempts are rate-limited (KV).
 *
 * Required bindings (set in the Cloudflare Pages project, never in this repo):
 *   - SITE_PASSPHRASE : secret (the class passphrase)
 *   - GATE_KV         : KV namespace (per-IP failed-attempt counters)   [optional but recommended]
 *
 * The gate stores NO secret in code. The HMAC signing key is derived from the passphrase,
 * so rotating SITE_PASSPHRASE instantly invalidates every outstanding cookie.
 */

const COOKIE_NAME = "igs_gate";
const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days — unlock once, stay in
const MAX_FAILS = 8; // failed attempts per IP within the window before a temporary block
const FAIL_WINDOW = 60 * 15; // 15 minutes

const enc = new TextEncoder();

function b64url(buf) {
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signingKey(passphrase) {
  // key material = SHA-256(passphrase); imported as an HMAC-SHA256 key
  const material = await crypto.subtle.digest("SHA-256", enc.encode(passphrase));
  return crypto.subtle.importKey("raw", material, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

async function sign(passphrase, msg) {
  const key = await signingKey(passphrase);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return b64url(sig);
}

/** Constant-time string comparison (equal length only; a length difference returns false). */
function timingSafeEqual(a, b) {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const parts = header.split(/;\s*/);
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq > -1 && p.slice(0, eq) === name) return decodeURIComponent(p.slice(eq + 1));
  }
  return null;
}

async function cookieValid(request, passphrase) {
  const val = readCookie(request, COOKIE_NAME);
  if (!val) return false;
  const dot = val.lastIndexOf(".");
  if (dot < 1) return false;
  const exp = val.slice(0, dot);
  const sig = val.slice(dot + 1);
  const expNum = parseInt(exp, 10);
  if (!Number.isFinite(expNum) || expNum < Math.floor(Date.now() / 1000)) return false;
  const expected = await sign(passphrase, exp);
  return timingSafeEqual(sig, expected);
}

// ---- unlock page (fully self-contained; references no protected assets) ----
function unlockPage(state) {
  const banner =
    state === "error"
      ? `<p class="msg err">That passphrase wasn't right — please try again.</p>`
      : state === "locked"
      ? `<p class="msg err">Too many attempts. Please wait a few minutes and try again.</p>`
      : state === "noconfig"
      ? `<p class="msg err">The site is not configured yet. Please check back soon.</p>`
      : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>IGS Maths — enter passphrase</title>
<style>
  :root{ --navy:#1E2761; --ice:#CADCFC; --accent:#F96167; --ink:#222; --muted:#666; --paper:#FFFEFB; }
  *{ box-sizing:border-box; }
  body{ margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
        font-family:'Helvetica Neue',Arial,sans-serif; color:var(--ink);
        background:linear-gradient(160deg,#1E2761 0%,#2b3a86 45%,#3a2d72 100%); padding:24px; }
  .card{ background:var(--paper); width:100%; max-width:420px; border-radius:14px; padding:34px 30px 26px;
         box-shadow:0 18px 50px rgba(0,0,0,.35); border-top:6px solid var(--accent); }
  .brand{ font-weight:bold; color:var(--navy); font-size:22px; letter-spacing:.5px; margin-bottom:14px; }
  .brand span{ color:var(--accent); }
  h1{ font-family:Georgia,serif; color:var(--navy); font-size:22px; margin:0 0 6px; }
  .sub{ color:var(--muted); font-size:14.5px; margin:0 0 18px; }
  form{ display:flex; flex-direction:column; gap:12px; }
  input{ font-size:16px; padding:12px 14px; border:1.5px solid #ccd; border-radius:8px; outline:none; }
  input:focus{ border-color:var(--navy); box-shadow:0 0 0 3px rgba(30,39,97,.12); }
  button{ font-size:15px; font-weight:bold; color:#fff; background:var(--accent); border:none;
          padding:12px 14px; border-radius:8px; cursor:pointer; transition:background .15s,transform .1s; }
  button:hover{ background:#e24b52; } button:active{ transform:translateY(1px); }
  .msg{ font-size:14px; padding:9px 12px; border-radius:8px; margin:0 0 4px; }
  .err{ background:#FCE8E6; color:#8a2620; border:1px solid #f2c4bf; }
  .foot{ color:var(--muted); font-size:12.5px; text-align:right; margin:16px 0 0; }
</style>
</head>
<body>
  <main class="card">
    <div class="brand"><span>&#8721;</span> IGS Maths</div>
    <h1>Enter the class passphrase</h1>
    <p class="sub">This site is passphrase-protected. Enter the phrase to continue.</p>
    ${banner}
    <form method="POST" action="/__gate/unlock" autocomplete="off">
      <input type="password" name="passphrase" placeholder="Passphrase" aria-label="Passphrase" autofocus>
      <button type="submit">Unlock</button>
    </form>
    <p class="foot">&mdash; Mr Wong</p>
  </main>
</body>
</html>`;
}

function unlockResponse(state, status) {
  return new Response(unlockPage(state), {
    status: status || 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

function redirect(to, cookie) {
  const headers = new Headers({ Location: to, "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status: 302, headers });
}

async function handleUnlock(context) {
  const { request, env } = context;
  const pass = env.SITE_PASSPHRASE;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const kv = env.GATE_KV;

  // rate-limit gate (skip gracefully if KV is not bound, e.g. some local runs)
  let fails = 0;
  if (kv) {
    fails = parseInt((await kv.get("fail:" + ip)) || "0", 10) || 0;
    if (fails >= MAX_FAILS) return unlockResponse("locked", 429);
  }

  let submitted = "";
  try {
    const form = await request.formData();
    submitted = (form.get("passphrase") || "").toString();
  } catch (_) {
    submitted = "";
  }

  if (pass && timingSafeEqual(submitted, pass)) {
    if (kv) await kv.delete("fail:" + ip);
    const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
    const value = `${exp}.${await sign(pass, String(exp))}`;
    const cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Max-Age=${TTL_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;
    return redirect("/", cookie);
  }

  if (kv) await kv.put("fail:" + ip, String(fails + 1), { expirationTtl: FAIL_WINDOW });
  return unlockResponse("error", 401);
}

function handleLock() {
  const cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
  return redirect("/", cookie);
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pass = env.SITE_PASSPHRASE;

  // Fail closed: if no passphrase is configured, never serve protected content.
  if (!pass) return unlockResponse("noconfig", 503);

  if (url.pathname === "/__gate/unlock" && request.method === "POST") return handleUnlock(context);
  if (url.pathname === "/__gate/lock") return handleLock();

  if (await cookieValid(request, pass)) return next();

  // Unauthenticated: unlock page for HTML navigations, a lean 401 for asset/XHR requests.
  const accept = request.headers.get("Accept") || "";
  const isNav = request.method === "GET" && accept.includes("text/html");
  if (isNav) return unlockResponse("", 200);
  return new Response("Locked", { status: 401, headers: { "Cache-Control": "no-store" } });
}
