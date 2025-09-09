import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test1234');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('displays stat cards', async ({ page }) => {
    await expect(page.locator('text=Toplam Müvekkil')).toBeVisible();
    await expect(page.locator('text=Aktif Dava')).toBeVisible();
    await expect(page.locator('text=Yaklaşan Etkinlikler')).toBeVisible();
  });

  test('stat cards navigate to correct pages', async ({ page }) => {
    await page.click('text=Aktif Dava');
    await expect(page).toHaveURL(/.*\/cases\?status=active/);
  });

  test('quick links work', async ({ page }) => {
    await page.click('text=Takvim');
    await expect(page).toHaveURL(/.*\/events/);
  });

  test('navigation links work', async ({ page }) => {
    await page.click('nav >> text=Müvekkiller');
    await expect(page).toHaveURL(/.*\/clients/);
    
    await page.click('nav >> text=Davalar');
    await expect(page).toHaveURL(/.*\/cases/);
    
    await page.click('nav >> text=Takvim');
    await expect(page).toHaveURL(/.*\/events/);
  });

  test('calendar redirect works', async ({ page }) => {
    await page.goto('/calendar');
    await expect(page).toHaveURL(/.*\/events/);
  });
});
