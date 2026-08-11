#!/usr/bin/env python3
"""inject_analytics.py — ensure every top-level app page loads Plausible.

Claude Design regenerates the homepage and any sub-pages on every deploy,
which drops anything we add to <head>. This re-inserts the Plausible snippet
(idempotently) just before </head> on each top-level *.html app page, so our
privacy-friendly, cookieless analytics survive every pull — same idea as
inject_enhance.py does for the contact form.

The snippet below is the exact code Plausible's dashboard generated for the
"thewhykings.com" property (new-style tag: the site identity is baked into the
pa-*.js filename, so there is no data-domain attribute). Each Plausible site
has its OWN pa-*.js id — when reusing this script for another site, paste that
site's snippet here.

    python3 scripts/inject_analytics.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent

# --- exact snippet from the Plausible dashboard for thewhykings.com ---
SNIPPET = '''<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-cuTvfdSKJvGvGr0yJ0iqD.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>'''

pages = sorted(root.glob("*.html"))
for idx in pages:
    html = idx.read_text(encoding="utf-8")
    if "text/babel" not in html:          # only client-rendered app pages
        continue
    if "plausible.io" in html:            # idempotent — already injected
        print(f"{idx.name}: Plausible already present")
        continue
    i = html.rfind("</head>")
    if i == -1:
        print(f"{idx.name}: no </head> — skipped")
        continue
    html = html[:i] + SNIPPET + "\n" + html[i:]
    idx.write_text(html, encoding="utf-8")
    print(f"{idx.name}: Plausible injected")
