# E2E Tests — Trevor Ranch Squad

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

- `tests/contact-page.spec.ts` — Full contact puzzle flow (currently **skipped**): `/contact` redirects to `/` and `ContactPageContent` is not mounted until that route is restored. Expectations are kept in sync with the component for when you re-enable the suite.
