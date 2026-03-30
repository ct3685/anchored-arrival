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
BASE_URL=https://deploy-preview-9--trevor-ranchsquad.netlify.app npx playwright test

# Run with UI mode (interactive)
npx playwright test --ui

# Run headed (see the browser)
npx playwright test --headed
```

## CI

> **Note:** CI integration is not yet configured for this repository. To add
> automated test runs, create a `.github/workflows/` workflow that triggers on
> `deployment_status` events and runs tests against the Netlify preview URL.

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
