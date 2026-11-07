import { describe, expect, it } from 'vitest';
import { normalizeSafeUrl } from '@/Components/Base/safeUrl';

describe('normalizeSafeUrl', () => {
  it('preserves internal links and normalizes absolute web URLs', () => {
    expect(normalizeSafeUrl('/example?q=theme')).toBe('/example?q=theme');
    expect(normalizeSafeUrl(' https://example.org ')).toBe(
      'https://example.org/',
    );
  });

  it.each([
    '//example.org',
    '/\\example.org',
    'javascript:alert(1)',
    'https://user:pass@example.org',
  ])('rejects %s', (url) => expect(normalizeSafeUrl(url)).toBe(''));
});
