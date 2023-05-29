const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  features: {
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
};
