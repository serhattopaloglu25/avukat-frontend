import { test, expect } from '@playwright/test';

test.describe('Basic Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AvukatAjanda/);
  });

  test('cookie banner appears', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    const banner = page.getByText('Çerez Kullanımı');
    const bannerVisible = await banner.isVisible().catch(() => false);
    expect(bannerVisible).toBe(true);
  });

  test('header exists', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('auth modal opens', async ({ page }) => {
    await page.goto('/?auth=login');
    await page.waitForTimeout(2000);
    const dialog = page.locator('[role="dialog"]');
    const dialogVisible = await dialog.isVisible().catch(() => false);
    expect(dialogVisible).toBe(true);
  });

  test('mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    const menuButton = page.locator('button[aria-label*="Menü"]');
    const buttonVisible = await menuButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await menuButton.click();
      await page.waitForTimeout(500);
      const menu = page.locator('#mobile-menu');
      const menuVisible = await menu.isVisible().catch(() => false);
      expect(menuVisible).toBe(true);
    }
  });
});
