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
src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "wk_code.json"

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
