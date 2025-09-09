import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load and display key elements', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    const h1 = await page.locator('h1');
    await expect(h1).toContainText('Hukuk Büronuz İçin');
    await expect(h1).toContainText('Akıllı Ajanda Sistemi');
    
    // Check CTA form
    const signupForm = await page.locator('form');
    await expect(signupForm).toBeVisible();
    
    const nameInput = await page.locator('#signup-name');
    await expect(nameInput).toBeVisible();
    
    const emailInput = await page.locator('#signup-email');
    await expect(emailInput).toBeVisible();
    
    const submitButton = await page.locator('button[type="submit"]');
    await expect(submitButton).toContainText('Ücretsiz Başla');
  });

  test('should redirect to register with prefilled data', async ({ page }) => {
    await page.goto('/');
    
    // Fill form
    await page.fill('#signup-name', 'Test User');
    await page.fill('#signup-email', 'test@example.com');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForURL(/\/register/);
    
    // Check prefilled values
    const registerName = await page.locator('#register-name');
    await expect(registerName).toHaveValue('Test User');
    
    const registerEmail = await page.locator('#register-email');
    await expect(registerEmail).toHaveValue('test@example.com');
    
    // Check password field has focus
    const passwordField = await page.locator('#register-password');
    await expect(passwordField).toBeFocused();
  });

  test('should have good accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Check for labels
    const labels = await page.locator('label').count();
    expect(labels).toBeGreaterThan(0);
    
    // Check form inputs have IDs
    const inputsWithId = await page.locator('input[id]').count();
    const totalInputs = await page.locator('input').count();
    expect(inputsWithId).toBe(totalInputs);
    
    // Basic keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to navigate
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeDefined();
  });
});
