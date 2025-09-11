import { test, expect } from '@playwright/test';

test.describe('Landing Page Basic Tests', () => {
  test('home page responds', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('page has content', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(100);
  });

  test('demo page exists', async ({ page }) => {
    const response = await page.goto('/demo');
    expect(response?.status()).toBeLessThan(400);
  });

  test('header is visible', async ({ page }) => {
    await page.goto('/');
    const header = await page.locator('header').count();
    expect(header).toBeGreaterThan(0);
  });
});
