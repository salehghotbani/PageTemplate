# PageTemplate

قالب مستقل وب بر پایهٔ ساختار و شیوهٔ کدنویسی `HastYaNist/ui` در کامیت
`77cdd95`. صفحهٔ خانه و مسیر `/example` با دادهٔ نمونهٔ محلی اجرا می‌شوند.

## اجرا

پیش‌نیاز Node.js نسخهٔ ۲۴٫۱۱ به بالا و نسخهٔ pnpm مشخص‌شده در `package.json` است.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

سرور توسعه روی `http://localhost:3000` در دسترس است. برای تست مرورگر، Google Chrome
را نصب کنید یا با `pnpm exec playwright install chrome` آماده‌اش کنید.

```sh
pnpm validate
pnpm test:run
pnpm test:e2e
```

`pnpm validate:all` بررسی‌های استاتیک، بررسی نوع تست‌ها و هر دو مجموعهٔ تست را
اجرا می‌کند. برای بررسی خروجی تولید از `pnpm build` و سپس `pnpm preview` استفاده
کنید. روی میزبان تولید، مسیرهای برنامه را به `index.html` برگردانید و مسیر فایل‌های
ایستا و API را جدا سرو کنید تا باز کردن مستقیم مسیرهایی مانند `/example` کار کند.

GitHub Actions همین بررسی‌ها را برای push و pull request شاخهٔ `main` اجرا می‌کند.

## افزودن صفحه

1. صفحه را در `src/Components/Pages/<Feature>/` بسازید.
2. مسیر را در `src/Components/Base/BaseRouts.ts` تعریف و در `src/router.tsx` ثبت کنید.
3. متن‌ها و برچسب‌های دسترس‌پذیری را در هر دو فایل `src/locales/` بنویسید.
4. برای دادهٔ سرور از الگوی `src/Components/Base/api/exampleApi.ts` و برای فرم و
   فیلتر قابل اشتراک از الگوی مسیر `/example` استفاده کنید.

[معماری و پوشه‌بندی](./ARCHITECTURE.md) · [پکیج‌های اصلی و اختیاری](./docs/PACKAGES.md) ·
[مجوز و اعلان‌ها](./THIRD_PARTY_NOTICES.md)

## رفتار شناخته‌شده در توسعه

`next-themes@0.4.6` در رندر سمت مرورگر React 19 برای اسکریپت آغازین تم پیام
کنسول ثبت می‌کند. تغییر و بازیابی تم در تست Chrome تأیید شده است.
[گزارش در مخزن next-themes](https://github.com/pacocoursey/next-themes/issues/385)

## مجوز

کد پروژه تحت [مجوز اختصاصی](./LICENSE) منتشر شده است. شرایط مجوز فونت‌ها و
اجزای شخص ثالث در [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) آمده است.
