# Pulling the latest from Claude Design

Claude does this through the authenticated browser session (Claude-in-Chrome),
because the Claude Design API needs your claude.ai login. These are the steps
Claude runs — you just say **"deploy"**.

## Project

- **Project:** "Homepage | Main" — ID `d067581a-8b10-4b39-85fe-1b07f474f687`
- **API base:** `https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/`
  (`ListFiles`, `GetFile`, … — POST JSON, header `Connect-Protocol-Version: 1`)
- **Auth:** claude.ai session cookies (same-origin fetch from an open claude.ai tab)

## What we pull: the `deploy/` folder

Since 2026-11-11 the Design project contains a **`deploy/`** folder: the complete,
ready-to-host static site (the "Claude-Code-Handoff" package).

```
deploy/index.html                 homepage           -> /
deploy/sparring-1-1/index.html    Sparring 1:1 page  -> /sparring-1-1/
deploy/sections/**                homepage + sparring sections (JSX, compiled in the browser by Babel)
deploy/_ds/**                     design tokens + _ds_bundle.js
deploy/assets/**, uploads/**      logos, client logos, photos
deploy/legal/*                    Impressum / Datenschutz sources
deploy/robots.txt, sitemap.xml
deploy/README.md, CLAUDE-CODE-HANDOFF.md   internal notes — never published
```

The old loose files (`theWHYKINGS Homepage.html`, `theWHYKINGS Sparring 1-1.html`, top-level
`sections/`) are **not** used any more. Always pull `deploy/`.

## ⚠️ Discover the file list DYNAMICALLY — never hardcode

Sections get added / renamed / removed. List `deploy/` recursively and take every code
file; don't keep a fixed list.

```js
const base='https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/';
const PID='d067581a-8b10-4b39-85fe-1b07f474f687';
async function call(method, body){const r=await fetch(base+method,{method:'POST',
  headers:{'Content-Type':'application/json','Connect-Protocol-Version':'1'},credentials:'include',
  body:JSON.stringify(body||{})});return r.ok? r.json(): {error:r.status};}
async function listAll(prefix){let out=[];const r=await call('ListFiles',{projectId:PID,path:prefix});
  for(const e of (r.entries||[])){const p=prefix?prefix+'/'+e.name:e.name;
    if(e.type==='directory') out=out.concat(await listAll(p)); else out.push({path:p,size:Number(e.size||0)});}
  return out;}

// 1. CODE bundle -> wk_code.json  (keys are paths relative to deploy/)
const codeExts=/\.(html|jsx|js|css|json|md|txt|xml)$/i;
const files=(await listAll('deploy')).filter(f=>codeExts.test(f.path));
const bundle={};
for(const f of files){const o=await call('GetFile',{projectId:PID,path:f.path});
  bundle[f.path.replace(/^deploy\//,'')]={content:o.content};}
// download it so the bytes stay out of the chat:
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(bundle)],{type:'application/json'}));
a.download='wk_code.json';document.body.appendChild(a);a.click();
```

## Then, locally

```bash
python3 scripts/unpack_code.py          # newest ~/Downloads/wk_code*.json -> repo
                                        #   legal/* -> src/legal/*, README/HANDOFF skipped,
                                        #   stale sections/*.jsx removed
scripts/deploy.sh "describe what changed"
```

`deploy.sh` then runs (all idempotent):
1. `build_legal.py` — builds the served `legal/*.html` from `src/legal/*` and adds our
   **Plausible** + **Web3Forms** clauses to the Datenschutzerklärung
2. `patch_site.py` — root-absolute `window.SITE` links (home = `/`), canonical/sitemap
   trailing slash for `/sparring-1-1/`, writes the `/sparring` → `/sparring-1-1/` redirect stub
3. `inject_enhance.py` — `<script defer src="/enhance.js?v=<hash>">` on every page
4. `inject_analytics.py` — Plausible snippet in every `<head>`
5. **`verify_site.py` — the guard.** Aborts the deploy (exit 1) if a pull regressed something
   we layer on top: a `<form>` without `TWK.submitInquiry` (would fake the send), the gold
   hero gone, missing Plausible/enhance tag, internal docs in the served root.

Then commit + push (+ a Pages build request is not needed here; Pages builds on push).

## Images (only when they change)

Compare `deploy/assets|uploads` against the repo and pull only what's missing/changed:

```js
const media=(await listAll('deploy')).filter(f=>/^deploy\/(assets|uploads)\//.test(f.path))
  .map(f=>({path:f.path.replace(/^deploy\//,''),size:f.size}));   // -> download as wk_manifest.json
```
Compare sizes with the local files, bundle-fetch the differences as `wk_images.json`
(`{ "assets/…": {content: base64} }`) and run `python3 scripts/unpack_images.py`.
(On 2026-11-11 four unused brand logos existed only in Design — `helm-graphite`,
`wordmark-black/green/white` — nothing references them, so they were not pulled.)

## What is layered on top of Design (lives in this repo, not in Design)

| Layer | Where | Why not in Design |
|---|---|---|
| Real form delivery (Web3Forms) | `enhance.js` → `window.TWK.submitInquiry` | previews in Design must never send real inquiries; components fall back to their preview behaviour when `window.TWK` is absent |
| Plausible analytics | `scripts/inject_analytics.py` | Design previews would pollute the statistics |
| Datenschutz clauses (Plausible, Web3Forms) | `scripts/build_legal.py` | production-only services |
| `/sparring` redirect, URL normalisation | `scripts/patch_site.py` | hosting-specific |

The contact forms themselves (`sections/FinalCTA.jsx`, `sections/sparring/SpCTA.jsx`) and the
gold hero (`sections/sparring/SpHero.jsx`) are normal Design files that Claude edited; the
gold hero's canonical copy is `scripts/sphero_component.jsx`. If a future Design edit rewrites
one of them and `verify_site.py` fails, re-apply the wiring/hero from this repo's git history
(or the canonical copy) before deploying — don't bypass the guard.

## Testing locally (read this before trusting a preview)

Browsers cache static files by heuristic (hours, based on `Last-Modified`), so a plain
`python3 -m http.server` on a port you used earlier can show **stale** `.jsx` files. Use a
fresh port or a no-cache server. **Never submit the real contact form while testing** — it
POSTs to Web3Forms and lands in the inbox; stub `window.fetch` for `api.web3forms.com`
in the page instead (see git history of this file's session for the pattern).

## Gotchas

- The design preview harness (`<script data-omelette-injected>`) inside `index.html` is
  re-minified server-side on every fetch, so the pages always show a diff — noise, inert
  when hosted standalone.
- `.nojekyll` must stay (so GitHub serves the `_ds/` underscore folder).
- The Chrome extension disconnects often mid-session — reconnect and retry.
- Others push too — always `git fetch` and reconcile before deploying.
- Close the claude.ai tab you opened when the pull is done.
