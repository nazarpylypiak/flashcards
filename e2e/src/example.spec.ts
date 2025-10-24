import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/decks');

  const toolbarTitle = page.locator('mat-toolbar span:text("Flashcards App")');
  await expect(toolbarTitle).toHaveText('Flashcards App');
});
