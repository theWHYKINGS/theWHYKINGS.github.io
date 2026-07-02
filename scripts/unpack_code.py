#!/usr/bin/env python3
"""unpack_code.py — decode a wk_code.json bundle (source HTML, sections,
design-system, image-slot/tweaks) pulled from Claude Design into the repo.

Used by the "build from live source" deploy path: the homepage is hosted as
its Claude Design source (client-rendered) + its dependencies, so it always
reflects the current design without waiting for an offline re-export.

The source file "theWHYKINGS Homepage.html" is written as index.html.

    python3 scripts/unpack_code.py [path/to/wk_code.json]
    (defaults to ~/Downloads/wk_code.json)
"""
import base64
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent

# Chrome saves repeat downloads as "wk_code (1).json", "wk_code (2).json", …
# so default to the NEWEST wk_code*.json, not a fixed name (else we'd unpack a
# stale bundle and silently deploy nothing).
if len(sys.argv) > 1:
    src = Path(sys.argv[1])
else:
    matches = sorted(Path.home().glob("Downloads/wk_code*.json"), key=lambda p: p.stat().st_mtime)
    if not matches:
        raise SystemExit("No wk_code*.json found in ~/Downloads")
    src = matches[-1]
print(f"reading {src.name}")

RENAME = {"theWHYKINGS Homepage.html": "index.html"}

data = json.loads(src.read_text(encoding="utf-8"))
count = 0
for rel, obj in data.items():
    out = RENAME.get(rel, rel)
    dest = (root / out).resolve()
    if root not in dest.parents:
        print(f"  ! skipped (outside repo): {rel}")
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(base64.b64decode(obj["content"]))
    count += 1
print(f"✓ wrote {count} code files (source -> index.html)")
