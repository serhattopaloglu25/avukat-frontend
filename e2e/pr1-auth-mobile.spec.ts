import { test, expect } from '@playwright/test';

// Increase default timeout for slower systems
test.setTimeout(60000);

test.describe('PR#1 - Auth Modal & Mobile Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page first
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Clear localStorage
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('cookie banner should appear on first visit', async ({ page }) => {
    await page.goto('/');
    
    // Wait for cookie banner to appear
    await page.waitForSelector('text=Çerez Kullanımı', { timeout: 10000 });
    
    // Check if cookie banner elements are visible
    await expect(page.getByText('Çerez Kullanımı')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kabul Et' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reddet' })).toBeVisible();
  });

  test('accepting cookies should hide banner and load analytics', async ({ page }) => {
    await page.goto('/');
    
    // Wait for banner to appear
    await page.waitForSelector('text=Çerez Kullanımı', { timeout: 10000 });
    
    // Click accept
    await page.getByRole('button', { name: 'Kabul Et' }).click();
    
    // Wait for banner to disappear
    await page.waitForSelector('text=Çerez Kullanımı', { state: 'hidden', timeout: 10000 });
    
    // Check localStorage
    const consent = await page.evaluate(() => localStorage.getItem('aa_consent'));
    expect(consent).toBe('v1');
  });

  test('header should be present on all pages', async ({ page }) => {
    // Test only existing pages
    const routes = ['/', '/ozellikler', '/fiyatlandirma', '/blog', '/iletisim'];
    
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Wait for header to be visible
      await page.waitForSelector('header', { timeout: 10000 });
      
      // Check if header exists
      await expect(page.locator('header').first()).toBeVisible();
      
      // Check no duplicate headers
      const headerCount = await page.locator('header').count();
      expect(headerCount).toBe(1);
    }
  });

  test('no duplicate headers or second bars', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait for page to load
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Count headers - should be exactly 1
    const headerCount = await page.locator('header').count();
    expect(headerCount).toBe(1);
    
    // Check that header has single-line navigation (no second bar)
    const header = page.locator('header').first();
    const headerHeight = await header.evaluate(el => el.offsetHeight);
    expect(headerHeight).toBeLessThanOrEqual(100); // Single line header should be max 100px
  });

  test('auth modal should open with ?auth=login query', async ({ page }) => {
    await page.goto('/?auth=login', { waitUntil: 'networkidle' });
    
    // Wait for dialog to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    
    // Check if modal is visible
    const dialog = page.locator('[role="dialog"]').first();
    await expect(dialog).toBeVisible();
    
    // Check if login form elements are present
    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();
    await expect(page.getByRole('button', { name: /Giriş Yap/i }).first()).toBeVisible();
  });

  test('auth modal should close on ESC', async ({ page }) => {
    await page.goto('/?auth=login', { waitUntil: 'networkidle' });
    
    // Wait for modal to open
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    
    // Check modal is visible
    await expect(page.locator('[role="dialog"]').first()).toBeVisible();
    
    // Press ESC
    await page.keyboard.press('Escape');
    
    // Wait a bit for animation
    await page.waitForTimeout(500);
    
    // Modal should be closed
    const dialogVisible = await page.locator('[role="dialog"]').isVisible().catch(() => false);
    expect(dialogVisible).toBe(false);
  });

  test('register tab should require all consents', async ({ page }) => {
    await page.goto('/?auth=register', { waitUntil: 'networkidle' });
    
    // Wait for modal
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    
    // Wait for register tab to be active
    await page.waitForTimeout(1000);
    
    // Submit button should be disabled initially
    const submitButton = page.getByRole('button', { name: /Kayıt Ol/i }).last();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeDisabled();
    
    // Fill form fields
    await page.locator('#register-name').fill('Test User');
    await page.locator('#register-email').fill('test@example.com');
    await page.locator('#register-password').fill('password123');
    await page.locator('#register-confirm-password').fill('password123');
    
    // Still disabled without consents
    await expect(submitButton).toBeDisabled();
    
    // Check all consent boxes
    await page.locator('#kvkk').check();
    await page.locator('#aydinlatma').check();
    await page.locator('#uyelik').check();
    
    // Now button should be enabled
    await expect(submitButton).toBeEnabled();
  });

  test('/login route should redirect to /?auth=login', async ({ page }) => {
    // Go to /login
    const response = await page.goto('/login', { waitUntil: 'networkidle' });
    
    // Wait for redirect
    await page.waitForTimeout(1000);
    
    // Check URL contains auth=login
    const url = page.url();
    expect(url).toContain('auth=login');
    
    // Wait for modal
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    
    // Check if login modal is open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('/register route should redirect to /?auth=register', async ({ page }) => {
    // Go to /register
    const response = await page.goto('/register', { waitUntil: 'networkidle' });
    
    // Wait for redirect
    await page.waitForTimeout(1000);
    
    // Check URL contains auth=register
    const url = page.url();
    expect(url).toContain('auth=register');
    
    // Wait for modal
    await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
    
    // Check if register modal is open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('mobile menu should work correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for page to load
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="Menü"]').first();
    await expect(menuButton).toBeVisible();
    
    // Check aria-expanded is false initially
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open menu
    await menuButton.click();
    
    // Wait for menu to open with animation
    await page.waitForTimeout(300);
    
    // Check aria-expanded is now true
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Check if menu is visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Check if navigation items are visible
    const firstMenuItem = page.getByRole('menuitem', { name: 'Ana Sayfa' });
    await expect(firstMenuItem).toBeVisible();
    
    // Click Ana Sayfa to close menu
    await firstMenuItem.click();
    
    // Wait for close animation
    await page.waitForTimeout(300);
    
    // Menu should be closed
    const menuVisible = await mobileMenu.isVisible().catch(() => false);
    expect(menuVisible).toBe(false);
  });

  test('mobile menu keyboard navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for page to load
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Find and click menu button directly
    const menuButton = page.locator('button[aria-label*="Menü"]').first();
    await expect(menuButton).toBeVisible();
    
    // Click to open menu
    await menuButton.click();
    
    // Wait for menu animation
    await page.waitForTimeout(500);
    
    // Check if menu is open
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Press ESC to close
    await page.keyboard.press('Escape');
    
    // Wait for close animation
    await page.waitForTimeout(500);
    
    // Menu should be closed
    const menuVisible = await mobileMenu.isVisible().catch(() => false);
    expect(menuVisible).toBe(false);
  });
});
