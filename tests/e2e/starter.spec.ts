import { expect, test } from '@playwright/test';

test('restores a validated search from the URL and keeps unrelated parameters', async ({
  page,
}) => {
  await page.goto('/example?ref=shared');
  const query = page.getByRole('searchbox', { name: 'جست‌وجو در فهرست' });
  const search = page.getByRole('button', { name: 'جست‌وجو', exact: true });
  await expect(
    page.getByRole('heading', { name: 'ساختار صفحه‌ها' }),
  ).toBeVisible();

  await query.fill('a'.repeat(81));
  await search.click();
  await expect(
    page.getByText('عبارت جست‌وجو باید حداکثر ۸۰ نویسه باشد.'),
  ).toBeVisible();

  await query.fill('روشن');
  await search.click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get('q'))
    .toBe('روشن');
  await expect(
    page.getByRole('heading', { name: 'ساختار صفحه‌ها' }),
  ).toHaveCount(0);

  await page.reload();
  await expect(query).toHaveValue('روشن');
  await expect(
    page.getByRole('heading', { name: 'پوستهٔ روشن و تاریک' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'پاک کردن' }).click();
  await expect(query).toHaveValue('');
  await expect(page).toHaveURL(/\/example\?ref=shared$/);

  await query.fill('عبارت ناموجود');
  await search.click();
  await expect(page.getByText('موردی پیدا نشد.')).toBeVisible();
});

test('keeps mobile layout, language, direction and color mode usable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');

  await expect(html).toHaveAttribute('lang', 'fa');
  await expect(html).toHaveAttribute('dir', 'rtl');
  await page.getByRole('button', { name: 'تغییر به حالت تاریک' }).click();
  await expect(html).toHaveClass(/\bdark\b/);

  await page.getByRole('button', { name: 'تغییر زبان به انگلیسی' }).click();
  await expect(html).toHaveAttribute('lang', 'en');
  await expect(html).toHaveAttribute('dir', 'ltr');
  await page.getByRole('link', { name: 'Open example page' }).click();
  await expect(
    page.getByRole('heading', { name: 'Example list' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Page structure' }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBe(320);
  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(html).toHaveAttribute('lang', 'en');

  await page.goto('/missing');
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
});

test('recovers after a malformed API response', async ({ page }) => {
  await page.route('**/data/example-items.json', (route) =>
    route.fulfill({ json: { invalid: true } }),
  );
  await page.goto('/example');
  await expect(
    page.getByRole('alert').getByText('دریافت فهرست ممکن نشد.'),
  ).toBeVisible();
  await page.unroute('**/data/example-items.json');
  await page.getByRole('button', { name: 'تلاش دوباره' }).click();
  await expect(
    page.getByRole('heading', { name: 'ساختار صفحه‌ها' }),
  ).toBeVisible();
});
