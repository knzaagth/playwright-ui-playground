import { test, expect } from '@playwright/test';

test('Scenario 1: Dynamic ID', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/dynamicid');
  // Search the button with dynamic ID without relying on the ID attribute
  const dynamicButton = page.locator('button:has-text("Button with Dynamic ID")');
  await dynamicButton.click();
});

test('Scenario 2: Class Attribute', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/classattr');

  // Command to catch Pop-up Alert
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  // Search the button with class 'btn-primary'
  const blueButton = page.locator('button.btn-primary');
  await blueButton.click();

  await expect(blueButton).toBeVisible();
});

test('Scenario 3: Hidden Layers', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/hiddenlayers');

  // Search the green button by its ID
  const greenButton = page.locator('#greenButton');

  // 1st click on the button = should be succeed 
  await greenButton.click();

  // 2nd click on the button = should be failed because the button is hidden after the first click
  await greenButton.click({ timeout: 3000 });
});

test('Scenario 4: Load Delay', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');

  // Search the Load Delay page by text
  await page.locator('a:has-text("Load Delay")').click();

  // After loading finished, search and click button 'Button Appearing After Delay'
  const delayedButton = page.locator('button:has-text("Button Appearing After Delay")');
  await delayedButton.click();

  await expect(delayedButton).toBeVisible();
});