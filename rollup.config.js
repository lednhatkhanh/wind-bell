import ts from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import tailwindcss from 'tailwindcss';

export default {
  input: 'src/index.ts',

  output: [
    {
      file: 'build/wind-bell.cjs.js',
      format: 'cjs',
    },
    {
      file: 'build/wind-bell.esm.js',
      format: 'esm',
    },
  ],

  plugins: [
    nodeResolve({
      browser: true,
    }),
    postcss({
      extract: 'wind-bell.css',
      autoModules: true,
      minimize: true,
      sourceMap: false,
      plugins: [tailwindcss(), postcssImport(), postcssPresetEnv({ stage: 1 })],
    }),
    ts({
      transpiler: 'babel',
      transpileOnly: true,
    }),
  ],

  external: ['react', 'react-dom', 'framer-motion', '@popperjs/core', 'clsx', 'react-popper'],
};
