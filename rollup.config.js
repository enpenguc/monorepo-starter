import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.ts',
    output: {
      name: 'main',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/main.ts',
    // external: ['ms'],
    external: Object.keys(pkg.dependencies || {}),
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
