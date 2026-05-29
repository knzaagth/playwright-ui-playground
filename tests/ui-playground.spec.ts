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

test('Scenario 5: Ajax Data', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax');

  // Search the button 'Button Triggering AJAX Request' and click it
  const ajaxButton = page.locator('#ajaxButton');
  await ajaxButton.click();

  const ajaxResult = page.locator('p:has-text("Data loaded with AJAX get request")');
  await expect(ajaxResult).toBeVisible({ timeout: 20000 });
});

test('Scenario 6: Client Side Delay', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/clientdelay');

  // Search the button 'Button Triggering Client Side Delay' and wait for data to appear (15 seconds)
  const clientDelayButton = page.locator('#ajaxButton');
  await clientDelayButton.click();

  const clientDelayResult = page.locator('p:has-text("Data calculated on the client side.")');
  await expect(clientDelayResult).toBeVisible({ timeout: 20000 });
});

test('Scenario 7: DOM Click Event', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/click');

  // Click the blue button and make sure the green button is visible after the click
  const blueButton = page.locator('button.btn-primary');
  await blueButton.click();

  const greenButton = page.locator('button.btn-success');
  await expect(greenButton).toBeVisible();
});

test('Scenario 8: Text Input', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/textinput');

  await page.locator('input.form-control').fill('Test Button');
  await page.locator('button.btn-primary').click();

  const changedButton = page.locator('button:has-text("Test Button")');
  await expect(changedButton).toBeVisible();
});

test('Scenario 9: Scrollbars', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/scrollbars');

  const hidingButton = page.locator('#hidingButton');
  await hidingButton.click();
  await expect(hidingButton).toBeVisible();
});

test('Scenario 10: Dynamic Table', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/dynamictable');

  const yellowLabelText = await page.locator('p.bg-warning').innerText();
  console.log(`Yellow label text: ${yellowLabelText}`);

  const allHeaders = page.locator('span[role="columnheader"]');
  const headersList = await allHeaders.allInnerTexts();
  const cpuIndex = headersList.indexOf('CPU');

  const chromeRow = page.locator('div[role="row"]').filter({ has: page.locator('span', { hasText: 'Chrome' }) });

  const cpuCell = chromeRow.locator('span[role="cell"]').nth(cpuIndex);
  const cpuTableValue = await cpuCell.innerText();

  console.log(`Nilai CPU Chrome di Tabel: ${cpuTableValue}`);

  expect(yellowLabelText).toContain(cpuTableValue);
});