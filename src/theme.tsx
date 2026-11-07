import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { dialogAnatomy } from '@chakra-ui/react/anatomy';

const appFont = 'var(--app-font-body, "shabnam", Tahoma, sans-serif)';

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: { body: { value: appFont }, heading: { value: appFont } },
      radii: {
        control: { value: '12px' },
        widget: { value: '16px' },
        surface: { value: '24px' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _light: '#f5f5f2', _dark: '#0b0d0c' } },
          panel: { value: { _light: '#ffffff', _dark: '#141716' } },
        },
        action: {
          bg: { value: '#c8ff4d' },
          fg: { value: '#111311' },
          hover: { value: '#d8ff78' },
        },
        accent: {
          fg: { value: { _light: '#4d6900', _dark: '#c8ff4d' } },
        },
      },
    },
    slotRecipes: {
      dialog: {
        slots: dialogAnatomy.keys(),
        base: { content: { borderRadius: 'surface' } },
      },
    },
  },
  globalCss: {
    html: { fontFamily: 'body' },
    'a[href], button:not(:disabled)': { cursor: 'pointer' },
  },
});

export const theme = createSystem(defaultConfig, customConfig);
