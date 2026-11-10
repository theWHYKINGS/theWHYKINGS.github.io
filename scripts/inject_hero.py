#!/usr/bin/env python3
"""inject_hero.py — keep the custom gold WebGL hero on the SPARRING page.

The /sparring hero is a custom pointer-reactive WebGL animation (the WHYKINGS
helm + a glowing brain) that Claude Design cannot produce. Its source of truth
is scripts/sphero_component.jsx; this copies it over
sections/sparring/SpHero.jsx on every deploy, so a fresh Claude Design pull —
which would otherwise bring back the old portrait hero — gets overridden
idempotently.

The HOMEPAGE hero (sections/Hero.jsx) is deliberately NOT touched — it stays
fully Claude-Design-managed.

IMPORTANT: edit the hero in scripts/sphero_component.jsx, NOT
sections/sparring/SpHero.jsx (which is overwritten here on each deploy). The
gold source image lives at assets/hero-gold.webp.

    python3 scripts/inject_hero.py
"""
import shutil
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = root / "scripts/sphero_component.jsx"
dst = root / "sections/sparring/SpHero.jsx"

if not src.exists():
    raise SystemExit("inject_hero: scripts/sphero_component.jsx is missing — cannot restore the Sparring hero")

new = src.read_text(encoding="utf-8")
old = dst.read_text(encoding="utf-8") if dst.exists() else None
if old == new:
    print("SpHero.jsx: custom gold Sparring hero already in place")
else:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, dst)
    print("SpHero.jsx: restored custom gold WebGL Sparring hero from scripts/sphero_component.jsx")

if not (root / "assets/hero-gold.webp").exists():
    print("  ⚠ assets/hero-gold.webp is missing — the hero animation needs this image")
