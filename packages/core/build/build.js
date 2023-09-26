import { build } from 'esbuild';
import path from 'path';
import glob from 'glob';
import { copy } from 'esbuild-plugin-copy';
import { buildScss } from './scss-builder.js';

const getTargetScripts = () =>
  [...glob.sync('src/**/*.ts'), ...glob.sync('src/**/*.tsx')]
    .filter(p => !p.endsWith('.stories.tsx'))
    .filter(p => !p.includes('/stories/'))
    .filter(p => !p.endsWith('.spec.ts'))
    .filter(p => !p.endsWith('.spec.tsx'));

const transpileScript = () =>
  build({
    format: '',
    entryPoints: getTargetScripts(),
    outdir: 'module',
    tsconfig: path.resolve('./tsconfig.build.json'),
    plugins: [
      copy({
        assets: [
          {
            from: ['./src/**/*.scss'],
            to: ['.']
          }
        ]
      })
    ]
  });

transpileScript();
buildScss();
