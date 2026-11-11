#!/usr/bin/env python3
"""pages.py — single source of truth for the pages of this site.

Every build/inject script imports PAGES from here, so adding a page is a
one-line change. `out` is the repo path (served by GitHub Pages), `url` the
public path. Mirrors academy-dev/scripts/pages.py.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.thewhykings.com"

PAGES = [
    {"out": "index.html", "url": "/"},
    {"out": "sparring-1-1/index.html", "url": "/sparring-1-1/"},
]


def page_files():
    """Existing page files as absolute Paths."""
    return [ROOT / p["out"] for p in PAGES if (ROOT / p["out"]).exists()]
