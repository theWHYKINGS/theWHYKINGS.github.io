#!/usr/bin/env python3
"""verify_site.py — deploy guard: fail loudly instead of shipping a regression.

Claude Design owns the page source and a fresh pull can silently overwrite the
production pieces we layer on top. This runs inside deploy.sh *before* the
commit; any failed check aborts the deploy (exit 1) with a clear message.

Checks
  * both pages exist and are real pages (React root + section scripts)
  * every page carries Plausible and /enhance.js (inject_* guarantee this)
  * contact forms are really wired: any sections/**/*.jsx with a <form> must
    call TWK.submitInquiry (else the form would fake / only mailto)
  * the Sparring hero is still the gold WebGL hero (marker + animation)
  * internal Design docs did not leak into the served repo root

    python3 scripts/verify_site.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import PAGES, ROOT  # noqa: E402

problems = []


def read(rel):
    p = ROOT / rel
    return p.read_text(encoding="utf-8") if p.exists() else None


# pages
for page in PAGES:
    html = read(page["out"])
    if html is None:
        problems.append(f"{page['out']}: page file is missing")
        continue
    if 'id="root"' not in html:
        problems.append(f"{page['out']}: no React root — not a real page?")
    if "plausible.io/js/" not in html:
        problems.append(f"{page['out']}: Plausible tag missing")
    if 'src="/enhance.js' not in html:
        problems.append(f"{page['out']}: /enhance.js tag missing (forms would not be delivered)")

if not (ROOT / "enhance.js").exists() or "submitInquiry" not in (read("enhance.js") or ""):
    problems.append("enhance.js: missing or has no submitInquiry()")

# forms: every component with a <form> must be wired
for jsx in sorted((ROOT / "sections").rglob("*.jsx")):
    src = jsx.read_text(encoding="utf-8")
    if "<form" in src and "TWK.submitInquiry" not in src and "T.submitInquiry" not in src:
        problems.append(
            f"{jsx.relative_to(ROOT).as_posix()}: has a <form> but no TWK.submitInquiry — the form would not "
            "really send (Design overwrote the wired version?). Re-apply the wiring before deploying."
        )

# gold hero on the Sparring page
hero = read("sections/sparring/SpHero.jsx") or ""
if 'data-gold-hero' not in hero or "getContext('webgl'" not in hero:
    problems.append(
        "sections/sparring/SpHero.jsx: gold WebGL hero is gone (Design pull replaced it?). "
        "Canonical copy: scripts/sphero_component.jsx"
    )
if not (ROOT / "assets/hero-gold.webp").exists():
    problems.append("assets/hero-gold.webp is missing")

# internal docs must not be published
for leak in ("CLAUDE-CODE-HANDOFF.md",):
    if (ROOT / leak).exists():
        problems.append(f"{leak} sits in the served repo root — remove it")

if problems:
    print("✗ verify_site: deploy blocked")
    for p in problems:
        print("   - " + p)
    sys.exit(1)
print(f"✓ verify_site: {len(PAGES)} pages, forms wired, gold hero + analytics present")
