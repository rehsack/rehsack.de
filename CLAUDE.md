# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal German-language blog for Jens Rehsack at https://rehsack.de.
Jekyll 4.4 with Minimal Mistakes (remote theme, skin "dirt") and jekyll-asciidoc.
Sister site: https://rehsack.dev (English, technical topics only).

## Development

The site runs inside a devcontainer based on `tpo42/adoc:latest` (Ruby 3.x, Bundler 4.x, full Asciidoctor toolchain). No local Ruby installation needed.

```bash
# Start the devcontainer
devcontainer up --workspace-folder .

# Serve locally (port 4000)
devcontainer exec --workspace-folder . bundle exec jekyll serve --host 0.0.0.0 --livereload

# Validate AsciiDoc files from the host (no devcontainer needed)
adcw validate -i _pages/about.adoc
```

After changing `.devcontainer/devcontainer.json`, remove the old container before `devcontainer up`:
```bash
docker rm -f <container-id>
```

## Build & Deploy

GitHub Actions (`.github/workflows/publish.yml`) builds and deploys to GitHub Pages on push to main. CI (`.github/workflows/ci.yml`) runs on branches and PRs, validating that expected pages exist, excluded files don't leak, theme toggle works, and navigation targets resolve.

## Content Policy

- **Language**: All content is German. The English counterpart lives at rehsack.dev.
- **AsciiDoc first**: prefer `.adoc` for all content. Markdown is acceptable where AsciiDoc is technically unsupported (e.g. `index.md` as a pure layout stub, or `imprint.md`).
- No client names in any public content. Industries and technologies are fine.
- **License**: Posts default to **CC BY-NC-SA 4.0** (set in `_config.yml` defaults). For opinion pieces, override per-post with `license: "CC BY-NC-ND 4.0"` in front matter. The Über-mich/profile page uses `license: "CC BY-NC-ND 4.0"` — sharing with attribution is fine, but no derivatives or commercial use. The license is rendered as a notice at the bottom of each page/post via `assets/js/post-license.js` and exposed as `<meta name="license">` for machines. Supported values: `CC BY-NC-SA 4.0`, `CC BY-NC-ND 4.0`, `All rights reserved` (or any custom string — non-CC values render as plain text).
- **Share buttons**: Explicitly chosen per post via `share_on:` array in front matter. No default — every post requires a conscious decision. Available platforms: `linkedin`, `mastodon`, `hackernews`, `reddit`, `facebook`, `bluesky`. The custom `_includes/social-share.html` overrides the theme's default. Mastodon sharing prompts the reader for their instance (remembered in localStorage). After 10-20 posts, consider switching to category-based defaults (Option C).

## Pitfall: Jekyll has no content whitelist

Jekyll renders **every** processable file (`.md`, `.adoc`, `.html`) in the repository root unless explicitly listed in `exclude:` in `_config.yml`. The `include:` directive only overrides Jekyll's *default* excludes (e.g. `_`-prefixed directories) — it is not a whitelist.

**When adding files to the repo root** (README.md, CLAUDE.md, docker-compose.yml, etc.), always add them to `exclude:` in `_config.yml` to prevent them from being deployed as pages. CI will catch leaks.

## Cross-linking with rehsack.dev

Both sites link to each other via author/footer links in `_config.yml`.

**Translation workflow** — most posts appear on both sites. The canonical version is German (here); rehsack.dev carries the English translation.

1. Create a branch in **both** repos (`rehsack.de` and `rehsack.dev`)
2. Write the German post in `_posts/`
3. Translate to English and place in `rehsack.dev/_posts/` (same filename/date)
4. Add `translation_url:` to the front matter of **both** posts, pointing to the other site's URL
5. Commit and push both repos, merge both PRs

The `translation_url` front matter variable triggers:
- a `<link rel="alternate" hreflang="…">` tag (SEO)
- a flag icon (🇬🇧 / 🇩🇪) appended to the post title via `assets/js/translation-link.js`, linking to the counterpart

Posts without `translation_url` render normally without any flag.

## Architecture

- **Theme**: Minimal Mistakes via `jekyll-remote-theme` (no local theme files)
- **Dark mode**: `_includes/head/custom.html` sets `data-theme` before first paint (prevents flash), `assets/js/theme-toggle.js` provides the toggle button, `_sass/_custom-overrides.scss` contains all dark-mode styles
- **Email obfuscation**: `assets/js/email-protect.js` assembles mailto links at runtime from `data-user`/`data-domain` attributes — bots see only placeholder text
- **Navigation**: `_data/navigation.yml` — Blog, Über mich, Impressum
- **Footer credit**: `_data/ui-text.yml` overrides `powered_by` to include Claude; the theme appends "Jekyll & Minimal Mistakes" automatically
- **Plugins**: jekyll-remote-theme, jekyll-asciidoc, jekyll-sitemap, jekyll-feed, jekyll-include-cache
- **AsciiDoc config**: source-highlighter set to rouge in `_config.yml` under `asciidoc.attributes`
- **Devcontainer**: `tpo42/adoc:latest` image, gems installed to `vendor/bundle` via `postCreateCommand`, `appPort` for CLI port mapping, `forwardPorts` for VS Code

## Post defaults

Posts get `read_time: true`, `share: true`, and `header.overlay_image: /assets/images/default-header.jpg` by default (configurable per-post in front matter). Gallery layout defaults to `grid`.

## Git

Always use `--signoff` on commits.
