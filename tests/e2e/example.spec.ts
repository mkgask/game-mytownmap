import { test, expect } from '@playwright/test';

/**
 * Example E2E test file for the game testing infrastructure.
 * This file demonstrates the basic structure for E2E tests.
 */

test.describe('Example E2E Tests', () => {
  test('should load the homepage', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Basic assertion - page should have some content
    await expect(page).toHaveTitle(/MyTownMap/);
  });

  test('should have basic page structure', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check for basic HTML structure
    await expect(page.locator('html')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  });
});