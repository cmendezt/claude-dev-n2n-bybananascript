import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/{{PROJECT_NAME}}/i);
  });

  test('displays welcome message', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /welcome to {{PROJECT_NAME}}/i })
    ).toBeVisible();
  });

  test('has Get Started button', async ({ page }) => {
    const button = page.getByRole('button', { name: /get started/i });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test('has Learn More button', async ({ page }) => {
    const button = page.getByRole('button', { name: /learn more/i });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });
});

test.describe('API Health Check', () => {
  test('returns healthy status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe('healthy');
    expect(data.timestamp).toBeDefined();
  });
});
