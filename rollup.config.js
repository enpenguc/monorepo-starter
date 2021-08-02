// import * as fs from 'fs';
// import * as path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: pkg.entry,
    output: {
      name: pkg.name,
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
    input: pkg.entry,
    // external: ['ms'],
    external: Object.keys(pkg.dependencies || {}),
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    output: [
      // { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
];

// function getPackagesSync(workspace) {
//   const entries = [];
//   const root = process.cwd();
//   const workspacePath = path.join(root, '/src');
//   // package entry
//   fs.readdirSync(workspacePath).forEach(item => {
//     const packagePath = path.join(workspacePath, item);
//     const entryFile = path.join(packagePath, 'index.ts');
//     if (
//       fs.lstatSync(packagePath).isDirectory()
//       && fs.lstatSync(entryFile).isFile()
//     ) {
//       entries.push(path.relative(process.cwd(), entryFile));
//     }
//   });
//   // root entry
//   const rootEntryFile = path.join(workspacePath, 'index.ts');
//   if (fs.lstatSync(rootEntryFile).isFile()) {
//     entries.push(path.relative(root, rootEntryFile));
//   }
//   return entries;
// }
// const inputs = getPackagesSync();
// export default inputs.map(item => {
//   const file = item.replace('src', 'dist').replace('index.ts', 'index.js');
//   return {
//     input: item,
//     external: Object.keys(pkg.dependencies || {}),
//     plugins: [
//       typescript({
//         tsconfig: './tsconfig.json',
//       }),
//     ],
//     output: [
//       // { file: pkg.main, format: 'cjs', sourcemap: true },
//       { file, format: 'es', sourcemap: true },
//     ],
//   };
// });
