const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y/register',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });
    config.resolve.extensions.push('.ts', '.tsx');

    const cssRule = config.module.rules.filter((rule) => rule.test.toString() === '/\\.css$/')[0];
    cssRule.use = [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: { auto: true },
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: { plugins: () => [tailwindcss(), postcssImport(), postcssPresetEnv({ stage: 1 })] },
      },
    ];

    return config;
  },
};
