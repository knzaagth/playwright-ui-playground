import { test, expect } from '@playwright/test';

test('Scenario 1: Dynamic ID', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/dynamicid');
  // Search the button with dynamic ID without relying on the ID attribute
  const dynamicButton = page.locator('button:has-text("Button with Dynamic ID")');
  await dynamicButton.click();
});

test('Scenario 2: Class Attribute', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/classattr');


});
