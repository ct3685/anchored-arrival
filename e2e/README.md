# E2E Tests — Agent Morgie

End-to-end tests using [Playwright](https://playwright.dev).

## Running locally

```bash
cd e2e
npm install
npx playwright install --with-deps chromium

# Run against local dev server
BASE_URL=http://localhost:3000 npx playwright test

# Run against a deploy preview
BASE_URL=https://deploy-preview-9--agent-morgie.netlify.app npx playwright test

# Run with UI mode (interactive)
npx playwright test --ui

# Run headed (see the browser)
npx playwright test --headed
```

## CI

Tests run automatically on every Netlify deploy preview via GitHub Actions.
The workflow triggers on `deployment_status` events — when Netlify reports
a successful deploy, tests run against the preview URL.

## Test structure

- `tests/contact-page.spec.ts` — Full contact page flow:
  - Entry screen rendering & animations
  - Cipher puzzle (Phase 1)
  - Trivia quiz (Phase 2)
  - Safe cracker (Phase 3)
  - Earned dossier with self-destruct
  - Skip flow
  - Navigation & reset
  - Accessibility (ARIA)
  - SEO meta tags
