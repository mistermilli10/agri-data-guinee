import { describe, expect, it } from 'vitest';
import { formatNumber } from '@/lib/utils';

describe('formatNumber', () => {
  it('formats thousands with suffix', () => {
    expect(formatNumber(12500)).toBe('12.5K');
  });

  it('returns zero fallback', () => {
    expect(formatNumber(null)).toBe('0');
  });
});
