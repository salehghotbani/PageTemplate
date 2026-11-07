interface SafeUrlOptions {
  image?: boolean;
  anchor?: boolean;
  relative?: boolean;
  protocols?: readonly string[];
  maxLength?: number;
}

/** Normalize user-provided URLs without protocol-relative or credential URLs. */
export function normalizeSafeUrl(
  value: unknown,
  {
    image = false,
    anchor = false,
    relative = true,
    protocols = image
      ? ['http:', 'https:']
      : ['http:', 'https:', 'mailto:', 'tel:'],
    maxLength = image ? 6_000_000 : 8_000,
  }: SafeUrlOptions = {},
): string {
  if (typeof value !== 'string' || value.length > maxLength) return '';
  const input = value.trim();
  if (!input || /[\\\p{Cc}]/u.test(input)) return '';
  if (anchor && /^#[a-z][\w-]*$/i.test(input)) return input;
  if (relative && /^\/(?!\/)/.test(input)) return input;
  if (
    image &&
    /^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(input)
  )
    return input;
  try {
    const url = new URL(input);
    if (url.username || url.password || !protocols.includes(url.protocol))
      return '';
    return url.href;
  } catch {
    return '';
  }
}
