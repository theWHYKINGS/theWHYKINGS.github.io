# Pulling the latest from Claude Design

Claude does this through the authenticated browser session (Claude-in-Chrome),
because the Claude Design API needs your claude.ai login. These are the steps
Claude runs — you don't run them by hand; you just say **"deploy"**.

## Project

- **Project ID:** `d067581a-8b10-4b39-85fe-1b07f474f687`
- **API base:** `https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/`
- **Auth:** claude.ai session cookies (same-origin fetch from an open claude.ai tab)

## ⚠️ Which file is the current export?

The project has several homepage files. The **live export** is the most-recently
updated one — check versions with `ListFiles`. As of this writing it is
**`theWHYKINGS Homepage (offline).html`** (React/CSS/sections inlined, no CDN).
The root **`index.html`** in the project is an older snapshot — don't assume it's
current; compare `version` timestamps first.

## Important: the export no longer inlines images

The current export references images by **path** (`assets/…`, `uploads/…`) instead
of inlining them (~1.5 MB instead of ~8.9 MB). So a deploy is **HTML + the image
files**. Those files must be hosted under `assets/` and `uploads/` in this repo.

## Steps (run inside an authenticated claude.ai tab)

```js
const PID = 'd067581a-8b10-4b39-85fe-1b07f474f687';
const call = async (method, body) => {
  const r = await fetch('https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/' + method,
    { method:'POST', headers:{'Content-Type':'application/json','Connect-Protocol-Version':'1'},
      credentials:'include', body: JSON.stringify(body) });
  return r.json();
};

// 1. pull the current offline export -> save as index.html (content is base64)
const gf = await call('GetFile', { projectId: PID, path: 'theWHYKINGS Homepage (offline).html' });
// decode gf.content (base64) and download as index.html

// 2. find which images it needs: render index.html on a local server, then
//    collect every <img> whose src is under /assets/ or /uploads/ (see the
//    render-and-collect snippet Claude uses). Decode the paths.

// 3. bundle-fetch those image paths: GetFile each, build { path: {content} },
//    download as wk_images.json (one file, keeps image bytes out of context).
```

Then, locally:

```bash
# decode the image bundle into assets/ + uploads/
python3 scripts/unpack_images.py ~/Downloads/wk_images.json
# move the pulled export into place
mv ~/Downloads/'theWHYKINGS Homepage (offline).html' index.html   # or the downloaded name
# publish (rebuilds legal pages, re-injects enhance.js, commits, pushes)
scripts/deploy.sh "describe what changed"
```

Most deploys only change text/layout — the image set rarely changes, so step 2/3
can be skipped unless a render check shows broken images.

## Legal pages

The homepage footer links natively to `legal/Impressum.html` and
`legal/Datenschutz.html`. Those are built from the project's `legal/` sources
by `scripts/build_legal.py` (self-contained; run automatically by `deploy.sh`).
Re-pull `legal/*` into `src/legal/` only when you change the legal text in Design.

## enhance.js

Adds the working contact form (Web3Forms) at runtime and is re-injected into
`index.html` on every deploy by `scripts/inject_enhance.py`.
