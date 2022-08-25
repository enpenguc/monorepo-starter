import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { terser } from 'rollup-plugin-terser';
import fileSize from 'rollup-plugin-filesize';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'utils',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
      }),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel({
        babelHelpers: 'bundled',
        extensions: [
          ...DEFAULT_EXTENSIONS,
          'ts',
          'tsx',
        ],
        exclude: 'node_modules/**'
      }),
      isProd && terser(),
      fileSize(),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.dependencies || {}),
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
      }),
      fileSize(),
      // babel({
      //   babelHelpers: 'bundled',
      //   extensions: [
      //     ...DEFAULT_EXTENSIONS,
      //     'ts',
      //     'tsx',
      //   ],
      //   exclude: 'node_modules/**'
      // }),
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'esm', sourcemap: true }
    ]
  }
];
