import { baseTheme } from '../theme/base-theme';
import type { MantineThemeOverride } from '@mantine/core';

export const blueTheme: MantineThemeOverride = {
  ...baseTheme,
  primaryShade: { light: 6, dark: 5 },
  colors: {
    ...(baseTheme.colors ?? {}),
    primary: baseTheme.colors?.blue ?? baseTheme.colors?.primary,
    secondary: baseTheme.colors?.slate ?? baseTheme.colors?.secondary,
    dark: baseTheme.colors?.slate ?? baseTheme.colors?.dark,
  },
  other: {
    ...(baseTheme.other ?? {}),
    style: 'blue',
  },
};
