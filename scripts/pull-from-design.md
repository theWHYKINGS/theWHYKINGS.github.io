# Pulling the latest export from Claude Design

The Claude Design project stores several representations of the homepage. The
one we host is **`index.html`** — the *offline / standalone* export with React,
CSS, fonts, and all images inlined (no external dependencies).

This file is fetched from the project's private API, which requires your
**claude.ai login**. Claude does this through the authenticated browser session
(Claude-in-Chrome extension), so the steps below are what Claude runs — you
don't run them by hand.

## Project

- **Project ID:** `d067581a-8b10-4b39-85fe-1b07f474f687`
- **API base:** `https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/`
- **Auth:** claude.ai session cookies (same-origin fetch from an open claude.ai tab)

## Steps (run inside an authenticated claude.ai tab)

```js
const PID = 'd067581a-8b10-4b39-85fe-1b07f474f687';
const call = async (method, body) => {
  const r = await fetch(
    'https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/' + method,
    { method:'POST',
      headers:{'Content-Type':'application/json','Connect-Protocol-Version':'1'},
      credentials:'include', body: JSON.stringify(body) });
  return r.json();
};

// 1. (optional) list files to confirm names
await call('ListFiles', { projectId: PID });

// 2. get the offline export; `content` is base64
const gf = await call('GetFile', { projectId: PID, path: 'index.html' });

// 3. decode + trigger a browser download to ~/Downloads
const bin = atob(gf.content);
const bytes = new Uint8Array(bin.length);
for (let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
const url = URL.createObjectURL(new Blob([bytes], {type:'text/html'}));
const a = document.createElement('a');
a.href = url; a.download = 'index.html'; document.body.appendChild(a); a.click(); a.remove();
```

## Then publish

```bash
mv ~/Downloads/index.html /Users/dominik/Desktop/website-dev/index.html
cd /Users/dominik/Desktop/website-dev
scripts/deploy.sh "describe what changed"
```

## Available files in the project (for reference)

| File | What it is |
|------|-----------|
| `index.html` | **Offline export** — fully self-contained. ← we host this |
| `theWHYKINGS Homepage (offline).html` | Identical to `index.html`. |
| `theWHYKINGS Homepage.html` | Live source (React + external `sections/`, `_ds/`, `assets/`). |
| `theWHYKINGS Homepage (standalone-src).html` | Source that loads React/Babel from a CDN. |
| `sections/*.jsx`, `_ds/`, `assets/`, `uploads/`, `legal/` | Component + asset tree behind the source. |
