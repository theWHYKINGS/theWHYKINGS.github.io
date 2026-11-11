#!/usr/bin/env bash
#
# deploy.sh — publish the current index.html to GitHub Pages.
#
# This commits whatever is in the working tree (normally a freshly pulled
# index.html from the Claude Design project) and pushes it to
# github.com/theWHYKINGS/theWHYKINGS.github.io, which GitHub Pages then
# serves at https://www.thewhykings.com (and https://thewhykings.github.io).
#
# Usage:
#   scripts/deploy.sh                 # commits with a timestamped message
#   scripts/deploy.sh "Update hero"   # commits with a custom message
#
# The *pull* step (fetching the latest export out of Claude Design) is done
# by Claude via the authenticated browser session — see README.md. This
# script only handles the publish half of the loop.

set -euo pipefail

cd "$(dirname "$0")/.."          # repo root
export PATH="$HOME/.local/bin:$PATH"   # local gh install

MSG="${1:-Update site — $(date '+%Y-%m-%d %H:%M')}"

# --- post-process the fresh export before publishing ---
# These run every deploy so enhancements survive each Claude Design pull.
echo "Building legal pages (+ Plausible & Web3Forms clauses)…"
python3 scripts/build_legal.py
echo "Normalising URLs (home -> /, canonical, sitemap, /sparring redirect)…"
python3 scripts/patch_site.py
echo "Self-hosting fonts + React/Babel (no third-party requests)…"
python3 scripts/localize_assets.py
echo "Ensuring enhance.js (contact-form delivery) is loaded by all pages…"
python3 scripts/inject_enhance.py
echo "Ensuring the Plausible analytics tag is present on all pages…"
python3 scripts/inject_analytics.py
echo "Verifying site invariants (aborts the deploy on a regression)…"
python3 scripts/verify_site.py

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing changed — working tree is clean. Nothing to deploy."
  exit 0
fi

echo "Staging changes…"
git add -A
git status --short

# Attribution: pass the model that is running this session, e.g.
#   CLAUDE_COAUTHOR="Claude Sonnet 5.5 <noreply@anthropic.com>" scripts/deploy.sh "msg"
CO_AUTHOR="${CLAUDE_COAUTHOR:-Claude <noreply@anthropic.com>}"

echo "Committing: $MSG"
git commit -q -m "$MSG

Co-Authored-By: $CO_AUTHOR"

echo "Pushing to GitHub…"
git push -q origin main

echo
echo "✅ Pushed. GitHub Pages will rebuild in ~1 minute."
echo "   Live:    https://www.thewhykings.com"
echo "   Backup:  https://thewhykings.github.io"
echo "   Build:   https://github.com/theWHYKINGS/theWHYKINGS.github.io/actions"
