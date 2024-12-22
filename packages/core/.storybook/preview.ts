import { type Preview } from '@storybook/react';
import './test-style.css';
import '../src/style/index';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
