import { auroraTheme } from '../aurora-theme/theme';
import { blueTheme } from '../blue-theme/theme';
import { cssVariablesResolver } from './cssVariableResolver';
import { baseTheme } from './base-theme';
import type { CSSVariablesResolver, MantineThemeOverride } from '@mantine/core';

export type AppThemeName = 'zinc' | 'aurora' | 'blue';

export const themes: Record<AppThemeName, MantineThemeOverride> = {
  zinc: baseTheme,
  aurora: auroraTheme,
  blue: blueTheme,
};

// Single switch point: change this value to change the whole app theme.
export const defaultThemeName: AppThemeName = 'blue';

export const appTheme: MantineThemeOverride = themes[defaultThemeName];
export const appCssVariablesResolver: CSSVariablesResolver =
  cssVariablesResolver;
