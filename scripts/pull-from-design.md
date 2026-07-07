# Pulling the latest from Claude Design

Claude does this through the authenticated browser session (Claude-in-Chrome),
because the Claude Design API needs your claude.ai login. These are the steps
Claude runs — you just say **"deploy"**.

## Project

- **Project ID:** `d067581a-8b10-4b39-85fe-1b07f474f687`
- **API base:** `https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/`
- **Auth:** claude.ai session cookies (same-origin fetch from an open claude.ai tab)

## We host the SOURCE, not the offline export

The Claude Design **offline export lags behind edits** (it isn't regenerated on
save), so we build from the live **source** `theWHYKINGS Homepage.html` +
its dependencies. That's client-rendered (React/Babel via unpkg, fonts via
Google Fonts) but always current.

## ⚠️ Discover the file list DYNAMICALLY — never hardcode sections

Sections get **added / renamed / removed** (e.g. `ThoughtLeadership.jsx` →
`FAQ.jsx`). A hardcoded list silently misses new sections (404) or ships stale
ones. So: pull the source first, then parse **its own** references.

```js
const PID = 'd067581a-8b10-4b39-85fe-1b07f474f687';
const call = async (path) => (await fetch(
  'https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/GetFile',
  { method:'POST', headers:{'Content-Type':'application/json','Connect-Protocol-Version':'1'},
    credentials:'include', body: JSON.stringify({ projectId: PID, path }) })).json();

// 1. pull the source, decode it
const srcB64 = (await call('theWHYKINGS Homepage.html')).content;
const src = new TextDecoder().decode(Uint8Array.from(atob(srcB64), c => c.charCodeAt(0)));

// 2. derive the exact dependency list FROM the source (no hardcoding)
const refs = [...src.matchAll(/(?:src|href)="((?:sections\/|_ds\/|assets\/)[^"]+|[\w.-]+\.js)"/g)]
  .map(m => m[1]).filter(p => !p.startsWith('http'));   // skip unpkg CDN
const paths = ['theWHYKINGS Homepage.html', ...new Set(refs)];
//  → paths now includes every sections/*.jsx, _ds/* file, image-slot.js, tweaks-panel.jsx
//    the CURRENT source actually loads. Add the _ds/tokens/*.css that styles.css @imports.

// 3. bundle-fetch all of them into one wk_code.json, download it (bytes stay out of context)
```

## Then, locally

```bash
python3 scripts/unpack_code.py        # newest wk_code*.json -> repo (source -> index.html)
python3 scripts/inject_enhance.py     # (deploy.sh does this too)

# Handle removed/renamed sections: delete any sections/*.jsx the source no
# longer references, so a stale file isn't left behind:
for f in sections/*.jsx; do grep -q "$(basename "$f")" index.html || git rm "$f"; done

scripts/deploy.sh "describe what changed"   # reconcile-safe; build_legal + inject + commit + push
```

## Images (only when they change)

Images live under `assets/` + `uploads/` and are already committed. Re-pull only
if a local render shows broken images: render `index.html` on `localhost`, collect
every `<img>`/CSS-bg URL under `/assets/` or `/uploads/` (decoded), bundle-fetch
them as `wk_images.json`, then `python3 scripts/unpack_images.py`.

## Legal pages & enhance.js

- Footer links point to `legal/Impressum.html` / `legal/Datenschutz.html`, built
  self-contained from `src/legal/` by `scripts/build_legal.py` (run by deploy.sh).
- `enhance.js` wires the contact form (Web3Forms) at runtime; re-injected each deploy.

## Gotchas

- The source's `<script data-omelette-injected>` harness is re-minified server-side
  on every fetch, so `index.html` always shows a diff — that's noise, not a real change.
  It's inert when hosted standalone (self-disables when `window.parent === window`).
- `.nojekyll` must stay (so GitHub serves the `_ds/` underscore folder).
- The Chrome extension disconnects often mid-session — reconnect (list/select) and retry.
- Others push too — always `git fetch` and reconcile before deploying.
