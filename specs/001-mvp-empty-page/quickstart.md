# Quickstart: Empty page MVP

**Feature**: Empty page MVP | **Date**: 2026-01-26

## Prerequisites

- Bun runtime installed (`curl -fsSL https://bun.sh/install | bash`)
- Cloudflare account for deployment

## Local Development

1. **Clone and setup**:
   ```bash
   git clone <repo-url>
   cd game-mytownmap
   git checkout 001-mvp-empty-page
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Create Astro config** (if not exists):
   ```javascript
   // astro.config.mjs
   import { defineConfig } from 'astro/config';

   export default defineConfig({});
   ```

4. **Start development server**:
   ```bash
   bun run dev
   ```
   Open http://localhost:4321

## Building

```bash
bun run build
```

Built files appear in `dist/` directory.

## Deployment

1. **Run quality checks**:
   ```bash
   bun run check
   ```

2. **Deploy to Cloudflare Pages**:
   ```bash
   bun run deploy
   ```

Or manually:
```bash
wrangler pages deploy dist
```

## Verification

- Page loads at deployed URL
- Shows project title and description
- Docs link is clickable
- Loads within 2 seconds

## Troubleshooting

- **Build fails**: Ensure all dependencies installed with `bun install`
- **Deploy fails**: Check Cloudflare account and Wrangler auth
- **Page not loading**: Verify dist/ contents and network connectivity