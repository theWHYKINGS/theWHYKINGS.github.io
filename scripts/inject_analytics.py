#!/usr/bin/env python3
"""inject_analytics.py — ensure every page loads Plausible.

Claude Design regenerates the pages on every deploy, which drops anything we
add to <head>. This re-inserts the Plausible snippet (idempotently) just before
</head> on each page in scripts/pages.py, so our privacy-friendly, cookieless
analytics survive every pull — same idea as inject_enhance.py does for the
contact forms. (Plausible is deliberately NOT kept in Claude Design: previews
there would pollute the statistics.)

The snippet below is the exact code Plausible's dashboard generated for the
"thewhykings.com" property (new-style tag: the site identity is baked into the
pa-*.js filename, so there is no data-domain attribute). Each Plausible site has
its OWN pa-*.js id — when reusing this script for another site, paste that
site's snippet here.

    python3 scripts/inject_analytics.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import page_files, ROOT  # noqa: E402

# --- exact snippet from the Plausible dashboard for thewhykings.com ---
SNIPPET = '''<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-cuTvfdSKJvGvGr0yJ0iqD.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>'''

for p in page_files():
    html = p.read_text(encoding="utf-8")
    name = p.relative_to(ROOT).as_posix()
    if "plausible.io" in html:            # idempotent — already injected
        print(f"{name}: Plausible already present")
        continue
    i = html.rfind("</head>")
    if i == -1:
        print(f"{name}: no </head> — skipped")
        continue
    html = html[:i] + SNIPPET + "\n" + html[i:]
    p.write_text(html, encoding="utf-8")
    print(f"{name}: Plausible injected")
