#!/usr/bin/env python3
"""pretty_urls.py — clean, human-friendly URLs for the multi-page site.

Claude Design names the sub-page file 'theWHYKINGS Sparring 1-1.html' (spaces,
mixed case) and links "home" to 'theWHYKINGS Homepage.html'. This:
  1. renames the sub-page to a clean 'sparring.html',
  2. drops the homepage copy (sub-pages now link home to the site root '/'),
  3. rewrites cross-page links in every top-level page accordingly.

Runs after unpack, before inject_enhance. Idempotent. Add a (old, new) pair to
SUBPAGES when a new sub-page appears in the design.
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent

# (Claude Design filename) -> (clean hosted filename)
SUBPAGES = {
    "theWHYKINGS Sparring 1-1.html": "sparring.html",
}

# 1. rename each sub-page to its clean filename
for old_name, new_name in SUBPAGES.items():
    old = root / old_name
    if old.exists():
        (root / new_name).write_bytes(old.read_bytes())
        old.unlink()
        print(f"renamed '{old_name}' -> {new_name}")

# 2. the homepage copy is obsolete (home links now point to '/')
copy = root / "theWHYKINGS Homepage.html"
if copy.exists():
    copy.unlink()
    print("removed obsolete homepage copy")

# 3. fix cross-page links in every top-level app page
for p in sorted(root.glob("*.html")):
    h = p.read_text(encoding="utf-8")
    out = h
    for old_name, new_name in SUBPAGES.items():
        out = out.replace(old_name, new_name)
    out = out.replace("theWHYKINGS Homepage.html", "/")   # home links -> site root
    if out != h:
        p.write_text(out, encoding="utf-8")
        print(f"fixed links in {p.name}")
