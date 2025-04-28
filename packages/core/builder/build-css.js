import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
//import { copy } from 'esbuild-plugin-copy';

// const getTargetScripts = () =>
//   [...glob.sync('src/**/*.ts'), ...glob.sync('src/**/*.tsx')]
//     .filter((p) => !p.endsWith('.stories.tsx'))
//     .filter((p) => !p.includes('/stories/'))
//     .filter((p) => !p.endsWith('.spec.ts'))
//     .filter((p) => !p.endsWith('.spec.tsx'));

const createCssFiles = () =>
  build({
    format: 'esm',
    bundle: true,
    entryPoints: ['src/style/index.ts'],
    outfile: 'dist/basement-ui.tmp',
    tsconfig: path.resolve('./tsconfig.build.json'),
    plugins: [vanillaExtractPlugin()],
  });

createCssFiles().then(() => {
  fs.unlink('dist/basement-ui.tmp');
});
