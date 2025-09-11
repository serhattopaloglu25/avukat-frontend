import { test, expect } from '@playwright/test';

test.describe('PR#2 - Landing Page V2 Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for page to fully load
    await page.waitForTimeout(1000);
  });

  test('landing page loads successfully', async ({ page }) => {
    // Check if page has content
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    
    // Check for any heading
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('hero section exists', async ({ page }) => {
    // Check for hero section text
    const heroText = await page.locator('text=/Hukuk|Akıllı|Büronuz/i').count();
    expect(heroText).toBeGreaterThan(0);
  });

  test('CTA buttons exist', async ({ page }) => {
    // Check for any buttons
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('features section exists', async ({ page }) => {
    // Check for feature cards
    const cards = await page.locator('.card, [class*="card"]').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('demo page loads', async ({ page }) => {
    await page.goto('/demo', { waitUntil: 'networkidle' });
    
    // Check demo page has content
    const content = await page.textContent('body');
    expect(content).toContain('Demo');
  });

  test('mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check page still has content
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Check no critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('Failed to load resource')
    );
    expect(criticalErrors.length).toBe(0);
  });
});
