import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });

  test("displays welcome heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Welcome");
  });

  test("navigation links are visible", async ({ page }) => {
    const homeLink = page.locator('a[href="/"]');
    const aboutLink = page.locator('a[href="/about"]');

    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  });

  test("can navigate to about page", async ({ page }) => {
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL("/about");

    const heading = page.locator("h1");
    await expect(heading).toContainText("About");
  });

  test("counter functionality works", async ({ page }) => {
    // Find increment button
    const incrementButton = page.locator('button:has-text("+")');
    const decrementButton = page.locator('button:has-text("-")');

    // Initial count should be visible
    const countDisplay = page.locator("text=0");
    await expect(countDisplay).toBeVisible();

    // Click increment
    await incrementButton.click();
    await expect(page.locator("text=1")).toBeVisible();

    // Click increment again
    await incrementButton.click();
    await expect(page.locator("text=2")).toBeVisible();

    // Click decrement
    await decrementButton.click();
    await expect(page.locator("text=1")).toBeVisible();
  });

  test("reset button works", async ({ page }) => {
    const incrementButton = page.locator('button:has-text("+")');
    const resetButton = page.locator('button:has-text("Reset")');

    // Increment a few times
    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();

    // Reset
    await resetButton.click();

    // Count should be back to 0
    const countDisplay = page.locator('span:has-text("0")');
    await expect(countDisplay).toBeVisible();
  });

  test("increment by 10 button works", async ({ page }) => {
    const incrementBy10Button = page.locator('button:has-text("+10")');

    await incrementBy10Button.click();

    const countDisplay = page.locator("text=10");
    await expect(countDisplay).toBeVisible();
  });

  test("feature cards are displayed", async ({ page }) => {
    // Check for feature cards
    const cards = page.locator(".card");
    await expect(cards).toHaveCount(7); // Including HelloWorld card
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("All rights reserved");
  });
});

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/About/);
  });

  test("displays tech stack section", async ({ page }) => {
    const techStackHeading = page.locator('h2:has-text("Tech Stack")');
    await expect(techStackHeading).toBeVisible();
  });

  test("displays all technology cards", async ({ page }) => {
    const technologies = [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Pinia",
      "Vue Router",
      "TanStack Query",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
    ];

    for (const tech of technologies) {
      const techCard = page.locator(`h3:has-text("${tech}")`);
      await expect(techCard).toBeVisible();
    }
  });

  test("call to action buttons are visible", async ({ page }) => {
    const documentationButton = page.locator(
      'button:has-text("View Documentation")',
    );
    const githubButton = page.locator('button:has-text("GitHub Repository")');

    await expect(documentationButton).toBeVisible();
    await expect(githubButton).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("can navigate between pages", async ({ page }) => {
    await page.goto("/");

    // Go to About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL("/about");

    // Go back to Home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL("/");
  });

  test("maintains state across navigation", async ({ page }) => {
    await page.goto("/");

    // Increment counter
    const incrementButton = page.locator('button:has-text("+")');
    await incrementButton.click();
    await incrementButton.click();

    // Navigate away and back
    await page.click('a[href="/about"]');
    await page.click('a[href="/"]');

    // Counter should maintain state (with Pinia)
    const countDisplay = page.locator("text=2");
    await expect(countDisplay).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("mobile navigation works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Navigation should still be accessible
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();
  });

  test("desktop layout displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    // Check that feature cards are in grid layout
    const cards = page.locator(".card");
    await expect(cards.first()).toBeVisible();
  });
});
