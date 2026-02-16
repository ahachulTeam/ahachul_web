import type { Preview } from '@storybook/react';

import '@ahhachul/design-system/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'app-bg',
      values: [
        { name: 'app-bg', value: 'var(--ah-color-background)' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
};

export default preview;
