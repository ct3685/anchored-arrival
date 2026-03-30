import { test, expect, type Page } from '@playwright/test';

// Increase default timeout for animations and network
test.use({ actionTimeout: 10000 });

/**
 * Skipped: `/contact` redirects to `/` and ContactPageContent is not mounted.
 * Re-enable this block when the contact route renders ContactPageContent again.
 *
 * Cipher note: ContactPageContent uses a random `targetShift` (1–25) on mount.
 * Helpers that click the slider at a fixed position assume that shift matches;
 * consider a deterministic shift for e2e when you restore the route.
 */
test.describe.skip(
  'Contact page — deferred until /contact serves ContactPageContent',
  () => {
    test.describe('Contact Page — Entry Screen', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
      });

      test('renders the entry screen with title and stamps', async ({
        page,
      }) => {
        await expect(page.getByText('OPERATION: CONTACT TREVOR')).toBeVisible({
          timeout: 10000,
        });
        await expect(page.getByText('TOP SECRET')).toBeVisible();
        await expect(
          page.getByText('CLASSIFIED', { exact: true })
        ).toBeVisible();
        await expect(
          page.getByText('This dossier is classified')
        ).toBeVisible();
      });

      test('shows ACCEPT MISSION button after delay', async ({ page }) => {
        const acceptBtn = page.getByRole('button', {
          name: /ACCEPT MISSION/i,
        });
        await expect(acceptBtn).toBeVisible({ timeout: 5000 });
      });

      test('shows Skip the Mission link after delay', async ({ page }) => {
        const skipBtn = page.getByRole('button', {
          name: /Skip the Mission/i,
        });
        await expect(skipBtn).toBeVisible({ timeout: 5000 });
      });

      test('navbar includes Links (layout shell)', async ({ page }) => {
        await expect(page.getByRole('link', { name: /^Links$/i })).toBeVisible();
      });
    });

    test.describe('Contact Page — Cipher Puzzle (Phase 1)', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
        const acceptBtn = page.getByRole('button', {
          name: /ACCEPT MISSION/i,
        });
        await expect(acceptBtn).toBeVisible({ timeout: 5000 });
        await acceptBtn.click();
        await expect(
          page.getByText('PHASE 1: DECODE THE CIPHER')
        ).toBeVisible({ timeout: 5000 });
      });

      test('renders cipher puzzle with slider and encrypted text', async ({
        page,
      }) => {
        await expect(page.getByText('Encrypted:')).toBeVisible();
        await expect(page.getByText('Decoded:')).toBeVisible();
        await expect(page.getByText('ROTATION:')).toBeVisible();
        await expect(page.locator('.MuiSlider-sizeMedium')).toBeVisible();
      });

      test('shows alphabet mapping', async ({ page }) => {
        await expect(
          page.getByText(/Original: ABCDEFGHIJKLMNOPQRSTUVWXYZ/)
        ).toBeVisible();
        await expect(page.getByText(/Rotated:/)).toBeVisible();
      });

      test('solving cipher (slider aligned to target shift) shows success and unlocks contact', async ({
        page,
      }) => {
        const slider = page.locator('.MuiSlider-sizeMedium');
        const box = await slider.boundingBox();
        if (!box) throw new Error('Slider not found');
        // Must match component targetShift (1–25); example assumes shift 3
        await page.mouse.click(
          box.x + (box.width * 3) / 25,
          box.y + box.height / 2
        );

        await expect(
          page.getByText('TREVOR IS THE COMMANDER')
        ).toBeVisible({ timeout: 3000 });
        await expect(page.getByText('PHASE 1 COMPLETE')).toBeVisible();
        await expect(
          page.getByText('trevor@ranchsquad.com').first()
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: /PROCEED TO PHASE 2/i })
        ).toBeVisible();
      });

      test('incorrect shift does not show success', async ({ page }) => {
        const slider = page.locator('.MuiSlider-sizeMedium');
        const box = await slider.boundingBox();
        if (!box) throw new Error('Slider not found');
        await page.mouse.click(
          box.x + (box.width * 5) / 25,
          box.y + box.height / 2
        );

        await expect(page.getByText('PHASE 1 COMPLETE')).not.toBeVisible();
      });
    });

    test.describe('Contact Page — Trivia Puzzle (Phase 2)', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToCipherSolved(page);
        await page.getByRole('button', { name: /PROCEED TO PHASE 2/i }).click();
        await expect(page.getByText('PHASE 2: SQUAD TRIVIA')).toBeVisible({
          timeout: 5000,
        });
      });

      test('renders all three trivia questions', async ({ page }) => {
        await expect(
          page.getByText("What platform is Trevor's primary HQ?")
        ).toBeVisible();
        await expect(
          page.getByText("What's Trevor's creator motto?")
        ).toBeVisible();
        await expect(
          page.getByText("Trevor's community is built on...")
        ).toBeVisible();
      });

      test('wrong answer shakes and stays clickable', async ({ page }) => {
        await page.getByRole('button', { name: 'YouTube' }).click();
        await expect(page.getByRole('button', { name: 'TikTok' })).toBeEnabled();
      });

      test('correct answers complete phase 2', async ({ page }) => {
        await page.getByRole('button', { name: 'TikTok' }).click();
        await page.getByRole('button', { name: 'Main Character Energy' }).click();
        await page.getByRole('button', { name: /Real conversations/i }).click();

        await expect(page.getByText('PHASE 2 COMPLETE')).toBeVisible({
          timeout: 3000,
        });
        await expect(page.getByText(/Secure Mail Drop/i)).toBeVisible();
        await expect(
          page.getByRole('button', { name: /PROCEED TO PHASE 3/i })
        ).toBeVisible();
      });
    });

    test.describe('Contact Page — Safe Puzzle (Phase 3)', () => {
      test.beforeEach(async ({ page }) => {
        await navigateToTriviaSolved(page);
        await page.getByRole('button', { name: /PROCEED TO PHASE 3/i }).click();
        await expect(page.getByText('PHASE 3: CRACK THE SAFE')).toBeVisible({
          timeout: 5000,
        });
      });

      test('renders safe with four dials', async ({ page }) => {
        await expect(page.getByText('Combination Lock')).toBeVisible();
        for (let i = 1; i <= 4; i++) {
          await expect(
            page.getByRole('button', { name: `Increase digit ${i}` })
          ).toBeVisible();
          await expect(
            page.getByRole('button', { name: `Decrease digit ${i}` })
          ).toBeVisible();
        }
        await expect(page.locator('[role="spinbutton"]')).toHaveCount(4);
      });

      test('dials increment and decrement correctly', async ({ page }) => {
        const firstDial = page.locator('[role="spinbutton"]').first();
        await expect(firstDial).toHaveText('0');
        await page.getByRole('button', { name: 'Increase digit 1' }).click();
        await expect(firstDial).toHaveText('1');
        await page.getByRole('button', { name: 'Decrease digit 1' }).click();
        await expect(firstDial).toHaveText('0');
      });

      test('dials wrap around (0 → 9 and 9 → 0)', async ({ page }) => {
        const firstDial = page.locator('[role="spinbutton"]').first();
        await page.getByRole('button', { name: 'Decrease digit 1' }).click();
        await expect(firstDial).toHaveText('9');
        await page.getByRole('button', { name: 'Increase digit 1' }).click();
        await expect(firstDial).toHaveText('0');
      });

      test('shows hint after 3 wrong attempts', async ({ page }) => {
        await page.getByRole('button', { name: 'Increase digit 1' }).click();
        await page.getByRole('button', { name: 'Increase digit 2' }).click();
        await page.getByRole('button', { name: 'Increase digit 3' }).click();
        await expect(page.getByText(/Need another hint/i)).toBeVisible({
          timeout: 2000,
        });
      });

      test('entering 1-0-0-0 solves the safe', async ({ page }) => {
        await page.getByRole('button', { name: 'Increase digit 1' }).click();
        await expect(
          page.getByText('SAFE CRACKED! DOSSIER UNLOCKED!')
        ).toBeVisible({ timeout: 3000 });
      });
    });

    test.describe('Contact Page — Dossier (Earned)', () => {
      test('solving all puzzles reveals full dossier with self-destruct', async ({
        page,
      }) => {
        await navigateToSafeSolved(page);
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 10000,
        });
        await expect(
          page.getByText('trevor@ranchsquad.com').first()
        ).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('DECLASSIFIED')).toBeVisible();
        await expect(page.getByText('BURN AFTER READING')).toBeVisible();
        await expect(page.getByText(/SELF-DESTRUCT:/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /DISARM/i })).toBeVisible();
      });

      test('DISARM button stops the self-destruct', async ({ page }) => {
        await navigateToSafeSolved(page);
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 10000,
        });
        await page.getByRole('button', { name: /DISARM/i }).click();
        await expect(page.getByText(/SELF-DESTRUCT:/i)).not.toBeVisible({
          timeout: 2000,
        });
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible();
      });

      test('dossier shows all contact info and social links', async ({
        page,
      }) => {
        await navigateToSafeSolved(page);
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 10000,
        });
        await page.getByRole('button', { name: /DISARM/i }).click();

        await expect(
          page.getByRole('link', { name: /trevor@ranchsquad\.com/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /classified@ranchsquad\.com/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /deepcover@ranchsquad\.com/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /hq@ranchsquad\.com/i })
        ).toBeVisible();

        await expect(page.getByText('5651 Coventry Lane #109')).toBeVisible();
        await expect(page.getByText('Fort Wayne, IN 46804')).toBeVisible();

        await expect(page.getByRole('link', { name: /TikTok/i })).toBeVisible();
        await expect(
          page.getByRole('link', { name: /YouTube/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /Instagram/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /Amazon Wishlist/i })
        ).toBeVisible();
      });
    });

    test.describe('Contact Page — Skip Flow', () => {
      test('skip shows dossier without puzzles or timer', async ({ page }) => {
        await page.goto('/contact');
        const skipBtn = page.getByRole('button', {
          name: /Skip the Mission/i,
        });
        await expect(skipBtn).toBeVisible({ timeout: 5000 });
        await skipBtn.click();

        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 5000,
        });
        await expect(
          page.getByText('trevor@ranchsquad.com').first()
        ).toBeVisible();
        await expect(page.getByText(/SELF-DESTRUCT:/i)).not.toBeVisible();
        await expect(
          page.getByRole('button', { name: /TRY THE FULL MISSION/i })
        ).toBeVisible();
      });

      test('skip dossier shows all contact info', async ({ page }) => {
        await page.goto('/contact');
        await page.getByRole('button', { name: /Skip the Mission/i }).click();
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 5000,
        });
        await expect(
          page.getByRole('link', { name: /trevor@ranchsquad\.com/i })
        ).toBeVisible();
        await expect(page.getByRole('link', { name: /TikTok/i })).toBeVisible();
        await expect(
          page.getByRole('link', { name: /YouTube/i })
        ).toBeVisible();
        await expect(
          page.getByRole('link', { name: /Instagram/i })
        ).toBeVisible();
      });
    });

    test.describe('Contact Page — Navigation & Reset', () => {
      test('START NEW MISSION resets back to entry', async ({ page }) => {
        await navigateToSafeSolved(page);
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 10000,
        });
        await page.getByRole('button', { name: /DISARM/i }).click();
        await page.getByRole('button', { name: /START NEW MISSION/i }).click();
        await expect(page.getByText('OPERATION: CONTACT TREVOR')).toBeVisible({
          timeout: 10000,
        });
      });

      test('TRY THE FULL MISSION from skip goes to entry', async ({
        page,
      }) => {
        await page.goto('/contact');
        await page.getByRole('button', { name: /Skip the Mission/i }).click();
        await expect(page.getByText('CLASSIFIED DOSSIER')).toBeVisible({
          timeout: 5000,
        });
        await page
          .getByRole('button', { name: /TRY THE FULL MISSION/i })
          .click();
        await expect(page.getByText('OPERATION: CONTACT TREVOR')).toBeVisible({
          timeout: 10000,
        });
      });
    });

    test.describe('Contact Page — Accessibility', () => {
      test('safe dials have proper ARIA attributes', async ({ page }) => {
        await navigateToTriviaSolved(page);
        await page.getByRole('button', { name: /PROCEED TO PHASE 3/i }).click();
        await expect(page.getByText('PHASE 3: CRACK THE SAFE')).toBeVisible({
          timeout: 5000,
        });

        const spinbuttons = page.locator('[role="spinbutton"]');
        await expect(spinbuttons).toHaveCount(4);
        for (let i = 0; i < 4; i++) {
          const dial = spinbuttons.nth(i);
          await expect(dial).toHaveAttribute('aria-valuenow', '0');
          await expect(dial).toHaveAttribute('aria-valuemin', '0');
          await expect(dial).toHaveAttribute('aria-valuemax', '9');
        }
      });

      test('interactive elements are keyboard accessible', async ({
        page,
      }) => {
        await page.goto('/contact');
        const acceptBtn = page.getByRole('button', {
          name: /ACCEPT MISSION/i,
        });
        await expect(acceptBtn).toBeVisible({ timeout: 5000 });
        await acceptBtn.focus();
        await page.keyboard.press('Enter');
        await expect(
          page.getByText('PHASE 1: DECODE THE CIPHER')
        ).toBeVisible({ timeout: 5000 });
      });
    });

    test.describe('Contact Page — SEO & Meta (redirect behavior)', () => {
      test('after /contact redirect, uses root layout title', async ({
        page,
      }) => {
        await page.goto('/contact');
        await expect(page).toHaveTitle(/Trevor \| Ranch Squad/i);
      });

      test('after /contact redirect, meta description matches root layout', async ({
        page,
      }) => {
        await page.goto('/contact');
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute('content');
        expect(description).toMatch(/Ranch Squad/i);
      });

      test('after /contact redirect, canonical points to site root', async ({
        page,
      }) => {
        await page.goto('/contact');
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute('href');
        expect(canonical).toMatch(/ranchsquad\.com\/?$/i);
      });
    });
  }
);

// ─── Helpers ───

async function navigateToCipherSolved(page: Page) {
  await page.goto('/contact');
  await page
    .getByRole('button', { name: /ACCEPT MISSION/i })
    .click({ timeout: 5000 });
  await expect(page.getByText('PHASE 1: DECODE THE CIPHER')).toBeVisible({
    timeout: 5000,
  });

  const slider = page.locator('.MuiSlider-sizeMedium');
  const box = await slider.boundingBox();
  if (!box) throw new Error('Slider not found');
  await page.mouse.click(
    box.x + (box.width * 3) / 25,
    box.y + box.height / 2
  );
  await expect(page.getByText('PHASE 1 COMPLETE')).toBeVisible({
    timeout: 3000,
  });
}

async function navigateToTriviaSolved(page: Page) {
  await navigateToCipherSolved(page);
  await page.getByRole('button', { name: /PROCEED TO PHASE 2/i }).click();
  await expect(page.getByText('PHASE 2: SQUAD TRIVIA')).toBeVisible({
    timeout: 5000,
  });

  await page.getByRole('button', { name: 'TikTok' }).click();
  await page.getByRole('button', { name: 'Main Character Energy' }).click();
  await page.getByRole('button', { name: /Real conversations/i }).click();
  await expect(page.getByText('PHASE 2 COMPLETE')).toBeVisible({
    timeout: 3000,
  });
}

async function navigateToSafeSolved(page: Page) {
  await navigateToTriviaSolved(page);
  await page.getByRole('button', { name: /PROCEED TO PHASE 3/i }).click();
  await expect(page.getByText('PHASE 3: CRACK THE SAFE')).toBeVisible({
    timeout: 5000,
  });

  await page.getByRole('button', { name: 'Increase digit 1' }).click();
  await expect(page.getByText('SAFE CRACKED!')).toBeVisible({ timeout: 3000 });
}
