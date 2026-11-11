#!/usr/bin/env python3
"""unpack_code.py — decode a wk_code.json bundle pulled from the `deploy/`
folder of the Claude Design project into the repo.

The bundle maps paths *relative to deploy/* -> {"content": base64}. It holds
every code file of the static site (index.html, sparring-1-1/index.html,
sections/**, _ds/**, legal/*, robots.txt, sitemap.xml, …). Mapping:

  legal/*                  -> src/legal/*   (scripts/build_legal.py builds the
                              served legal/ pages from there and adds our
                              Plausible + Web3Forms clauses)
  README.md,
  CLAUDE-CODE-HANDOFF.md   -> skipped  (internal Design notes; the repo root is
                              served publicly by GitHub Pages)
  everything else          -> same path in the repo

Stale files are removed: any sections/**/*.jsx the bundle no longer contains is
deleted, so a section removed or renamed in Design doesn't linger.

    python3 scripts/unpack_code.py [path/to/wk_code.json]
    (defaults to the NEWEST ~/Downloads/wk_code*.json)
"""
import base64
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent

if len(sys.argv) > 1:
    src = Path(sys.argv[1])
else:
    # Chrome saves repeat downloads as "wk_code (1).json", … so take the newest,
    # not a fixed name (else we'd unpack a stale bundle and silently deploy nothing).
    matches = sorted(Path.home().glob("Downloads/wk_code*.json"), key=lambda p: p.stat().st_mtime)
    if not matches:
        raise SystemExit("No wk_code*.json found in ~/Downloads")
    src = matches[-1]
print(f"reading {src.name}")

SKIP = {"README.md", "CLAUDE-CODE-HANDOFF.md"}


def target(rel: str):
    if rel in SKIP:
        return None
    if rel.startswith("legal/"):
        return "src/" + rel
    return rel


data = json.loads(src.read_text(encoding="utf-8"))
if "index.html" not in data or "sparring-1-1/index.html" not in data:
    raise SystemExit("Bundle looks wrong: index.html / sparring-1-1/index.html missing — is it a deploy/ pull?")

count = 0
for rel, obj in data.items():
    out = target(rel)
    if out is None:
        print(f"  - skipped (internal): {rel}")
        continue
    dest = (root / out).resolve()
    if root not in dest.parents:
        print(f"  ! skipped (outside repo): {rel}")
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(base64.b64decode(obj["content"]))
    count += 1
print(f"✓ wrote {count} files")

# remove section files Design no longer ships
keep = {rel for rel in data if rel.startswith("sections/")}
for f in sorted((root / "sections").rglob("*.jsx")):
    rel = f.relative_to(root).as_posix()
    if rel not in keep:
        f.unlink()
        print(f"  - removed stale section: {rel}")
