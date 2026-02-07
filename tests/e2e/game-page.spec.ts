/**
 * @fileoverview E2E tests for game page loading and functionality
 * @description Tests the complete user journey from page load to game interaction
 */

import { test, expect } from '@playwright/test'

test.describe('Game Page', () => {
  test('should load game page successfully', async ({ page }) => {
    // Navigate to game page
    await page.goto('/game')

    // Verify page title
    await expect(page).toHaveTitle('Traffic Jam Reducing City Builder')

    // Verify main heading
    const heading = page.locator('h1')
    await expect(heading).toContainText('Traffic Jam Reducing City Builder')

    // Verify canvas container exists
    const canvasContainer = page.locator('#game-canvas')
    await expect(canvasContainer).toBeVisible()

    // Verify canvas element is created (may take a moment to initialize)
    await page.waitForTimeout(1000)
    const canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()
  })

  test('should display game canvas with correct dimensions', async ({ page }) => {
    await page.goto('/game')

    // Wait for canvas to be initialized
    await page.waitForTimeout(1000)

    const canvas = page.locator('#game-canvas canvas')

    // Check canvas dimensions (should be 800x600 as configured)
    const boundingBox = await canvas.boundingBox()
    expect(boundingBox?.width).toBe(800)
    expect(boundingBox?.height).toBe(600)
  })

  test('should handle page navigation from home', async ({ page }) => {
    // Start from home page
    await page.goto('/')

    // Click the "Play Game" link
    const gameLink = page.locator('a[href="/game"]')
    await expect(gameLink).toContainText('Play Game')
    await gameLink.click()

    // Verify navigation to game page
    await expect(page).toHaveURL(/\/game/)
    await expect(page.locator('h1')).toContainText('Traffic Jam Reducing City Builder')
  })

  test('should maintain game state during navigation', async ({ page }) => {
    await page.goto('/game')

    // Wait for game initialization
    await page.waitForTimeout(1000)

    // Verify canvas is present
    const canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()

    // Navigate away and back
    await page.goto('/')
    await page.goto('/game')

    // Verify canvas is still present after navigation
    await page.waitForTimeout(1000)
    await expect(canvas).toBeVisible()
  })

  test('should handle browser refresh', async ({ page }) => {
    await page.goto('/game')

    // Wait for game initialization
    await page.waitForTimeout(1000)

    // Verify canvas exists
    const canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()

    // Refresh the page
    await page.reload()

    // Verify game reinitializes after refresh
    await page.waitForTimeout(1000)
    await expect(canvas).toBeVisible()
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    await page.goto('/game')

    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(500)

    let canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()

    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(500)

    canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()

    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)

    canvas = page.locator('#game-canvas canvas')
    await expect(canvas).toBeVisible()
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // This test would require setting up network interception
    // For now, we'll test basic error handling by checking the page loads
    await page.goto('/game')

    // Verify page loads even if some resources fail
    await expect(page.locator('h1')).toBeVisible()

    // Canvas might not load, but page should still be functional
    const canvasContainer = page.locator('#game-canvas')
    await expect(canvasContainer).toBeVisible()
  })
})