import { describe, expect, it } from 'vitest';

import { defaultThemeName, themes } from '~ui/theme';

describe('vitest unit project', () => {
  it('runs and resolves tsconfig path aliases', () => {
    expect(defaultThemeName).toBeTypeOf('string');
    expect(Object.keys(themes)).toContain(defaultThemeName);
  });
});
