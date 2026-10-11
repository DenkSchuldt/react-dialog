export default {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: { builder: { viteConfigPath: '.storybook/vite.config.js' } },
  },
  core: { disableTelemetry: true },
};
