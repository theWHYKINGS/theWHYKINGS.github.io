# DNS setup — pointing www.thewhykings.com at GitHub Pages

**Goal:** serve the site at `https://www.thewhykings.com` from GitHub Pages,
while keeping Google Workspace email working.

## Current situation (captured at setup)

- **Registrar:** RegistryGate GmbH
- **DNS host / nameservers:** `ns1.onepage.io`, `ns2.onepage.io` (your old site builder)
- **Old site IP:** `34.49.73.66` (apex + www both point here today)

Because the nameservers are Onepage's, the DNS records are managed at Onepage.
Site builders often don't allow custom records pointing at a third party like
GitHub. If Onepage won't let you add the records below, move DNS to a full
provider (Cloudflare, free) — see the bottom of this file.

## Records to ADD (point the website at GitHub Pages)

| Type | Name / Host | Value | Note |
|------|-------------|-------|------|
| CNAME | `www` | `thewhykings.github.io` | primary — the site lives here |
| A | `@` (apex) | `185.199.108.153` | so `thewhykings.com` → redirects to www |
| A | `@` (apex) | `185.199.109.153` | |
| A | `@` (apex) | `185.199.110.153` | |
| A | `@` (apex) | `185.199.111.153` | |
| AAAA | `@` (apex) | `2606:50c0:8000::153` | optional (IPv6) |
| AAAA | `@` (apex) | `2606:50c0:8001::153` | optional |
| AAAA | `@` (apex) | `2606:50c0:8002::153` | optional |
| AAAA | `@` (apex) | `2606:50c0:8003::153` | optional |

If the provider forbids a CNAME on `www` alongside other records, use the four
A records for `www` too (same GitHub IPs).

## Records to KEEP (do NOT delete — email + verification)

| Type | Name | Value |
|------|------|-------|
| MX | `@` | `1 aspmx.l.google.com` |
| MX | `@` | `5 alt1.aspmx.l.google.com` |
| MX | `@` | `5 alt2.aspmx.l.google.com` |
| MX | `@` | `10 alt3.aspmx.l.google.com` |
| MX | `@` | `10 alt4.aspmx.l.google.com` |
| MX | `@` | `10 w019ddeb.kasserver.com` |
| TXT | `@` | `v=spf1 mx a ?all` |
| TXT | `@` | `google-site-verification=iiXmgcOus4qajq9sbt77psYpgUDhNziuT9g9ov0BTqE` |
| CAA | `@` | `0 issue "letsencrypt.org"` (required — GitHub's HTTPS cert) |
| CAA | `@` | `0 issue "sectigo.com"` |

> The old `A @ 34.49.73.66` and `A www 34.49.73.66` (Onepage) get **replaced**
> by the GitHub records above.

## After DNS is changed

Claude will:
1. Re-add the `CNAME` file (`www.thewhykings.com`) to the repo.
2. Verify DNS resolves to GitHub (`dig +short www.thewhykings.com`).
3. Wait for GitHub to issue the Let's Encrypt certificate.
4. Turn on **Enforce HTTPS**.

Verify manually anytime:
```bash
dig +short www.thewhykings.com          # expect thewhykings.github.io / 185.199.108-111.153
curl -sI https://www.thewhykings.com | head -1
```

---

## Recommended if Onepage can't add these records: move DNS to Cloudflare (free)

1. Create a free account at https://dash.cloudflare.com and **Add a site**:
   `thewhykings.com`.
2. Cloudflare scans your current DNS — **verify every KEEP record above is
   present** (especially all 6 MX and both TXT records). Add any it missed.
3. Add the GitHub records from the **ADD** table (set the `www` CNAME and apex
   records to **DNS only / grey cloud** so GitHub can issue HTTPS directly).
4. Cloudflare shows you **two nameservers**. At **RegistryGate**, change the
   domain's nameservers from `ns1/ns2.onepage.io` to Cloudflare's two.
5. Propagation takes anywhere from minutes to a few hours.

This keeps Google email intact (step 2), gives full DNS control, and adds a
second CDN layer.
