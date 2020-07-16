import ts from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts',

  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],

  plugins: [
    postcss({
      extract: 'wind-bell.css',
      autoModules: true,
      minimize: true,
      sourceMap: false,
      plugins: [tailwindcss(), postcssImport(), postcssPresetEnv({ stage: 1 })],
    }),
    ts({
      transpiler: 'babel',
    }),
    terser(),
  ],

  external: ['react', 'react-dom', 'framer-motion', '@popperjs/core', 'clsx', 'react-popper'],
};
