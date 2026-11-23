# Contributing

Thanks for collaborating on this profile repository.

## Local preview & SVG generation

Both scripts under `scripts/` only use the Python 3.12+ standard library (no third-party packages required):

```bash
# Regenerate profile-card.svg using live GitHub stats
python3 scripts/generate_card.py --token "$GITHUB_TOKEN" --output profile-card.svg

# Regenerate hero-keynote.svg (offline, deterministic)
python3 scripts/generate_hero.py
```

## Scheduled workflows & secrets

- `.github/workflows/update-stats.yml`: runs every 6 hours; uses `PROFILE_TOKEN` if configured, falling back to `GITHUB_TOKEN`.
- `.github/workflows/waka.yml`: runs daily at 02:00 UTC; requires `WAKATIME_API_KEY` and `GH_TOKEN`.

## Pull requests

- Keep formatting consistent with `.editorconfig` (UTF-8, LF line endings).
- Open a pull request against `main` for any profile or automation updates.
- Keep `hero-keynote.svg` and `profile-card.svg` updated before opening a PR when editing scripts.
