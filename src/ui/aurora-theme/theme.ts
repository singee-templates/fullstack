import { baseTheme } from '../theme/base-theme';
import type { MantineThemeOverride } from '@mantine/core';

/**
 * Aurora theme: violet primary + warm neutral surfaces.
 */
export const auroraTheme: MantineThemeOverride = {
  ...baseTheme,
  // Keep a vivid primary for aurora; do not inherit the neutral zinc shade.
  primaryShade: { light: 6, dark: 5 },
  colors: {
    ...baseTheme.colors,
    // Use existing palettes from the base theme to avoid duplication
    primary: baseTheme.colors?.violet ?? baseTheme.colors?.primary,
    secondary: baseTheme.colors?.stone ?? baseTheme.colors?.slate,
    dark: baseTheme.colors?.stone ?? baseTheme.colors?.slate,
  },
  defaultRadius: 'md',
  other: {
    ...(baseTheme.other ?? {}),
    style: 'aurora',
  },
};
