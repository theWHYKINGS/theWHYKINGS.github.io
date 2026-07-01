# theWHYKINGS — Website

The public site for **theWHYKINGS** (Executive Sparring & Leadership Coaching),
hosted for free on **GitHub Pages** with a CDN and custom domain.

- **Live:** https://www.thewhykings.com
- **GitHub Pages URL:** https://thewhykings.github.io
- **Repo:** https://github.com/theWHYKINGS/theWHYKINGS.github.io
- **Design source:** [Claude Design project](https://claude.ai/design/p/d067581a-8b10-4b39-85fe-1b07f474f687)

## How it works

The page is designed in **Claude Design**. Claude exports it as a single,
fully self-contained `index.html` — React, CSS, fonts, and every image are
inlined, so there are **no external dependencies** and nothing else to host.
That one file is what GitHub Pages serves.

```
Claude Design  ──(Claude pulls the export)──▶  index.html  ──git push──▶  GitHub Pages ──▶ www.thewhykings.com
   (you edit)                                   (this repo)                 (free CDN + HTTPS)
```

## Deploying an update — the loop

1. **Edit the design** in the Claude Design project (link above).
2. **Tell Claude: "deploy"** (or "pull the latest design and deploy").
   Claude will:
   - open your authenticated Claude Design session in Chrome,
   - pull the newest `index.html` export via the design API,
   - drop it into this folder, and
   - run `scripts/deploy.sh` to commit + push.
3. GitHub Pages rebuilds automatically (~1 min) and the CDN serves the update.

> The **publish** half is scripted (`scripts/deploy.sh`). The **pull** half runs
> through Claude + the browser because the Claude Design API needs your
> claude.ai login — see `scripts/pull-from-design.md` for the exact API calls.

### Manual deploy (if you exported the file yourself)

If you download the offline/standalone `index.html` from Claude Design yourself,
just replace the `index.html` in this folder and run:

```bash
scripts/deploy.sh "describe what changed"
```

## Custom domain & HTTPS

- The custom domain is **www.thewhykings.com**, stored in the `CNAME` file.
- DNS records live with your DNS provider (see `docs/dns-setup.md`).
- HTTPS is a free, auto-renewing Let's Encrypt certificate provisioned by GitHub
  once DNS points at GitHub Pages.
- Your **Google Workspace email (MX records) is untouched** by the website DNS.

## Repo layout

| Path | Purpose |
|------|---------|
| `index.html` | The deployed site (self-contained export from Claude Design). |
| `CNAME` | Tells GitHub Pages the custom domain (`www.thewhykings.com`). |
| `.nojekyll` | Disables Jekyll so GitHub serves the HTML verbatim. |
| `scripts/deploy.sh` | Commit + push helper (the publish half of the loop). |
| `scripts/pull-from-design.md` | Exact API calls Claude uses to pull the export. |
| `docs/dns-setup.md` | DNS records for the custom domain. |
| `src/` | Reference copies of the Design source files (not served). |

## Tooling

- **GitHub CLI (`gh`)** is installed at `~/.local/bin/gh` and authenticated as
  `theWHYKINGS` (token in the macOS keychain). Used for repo + Pages management.
