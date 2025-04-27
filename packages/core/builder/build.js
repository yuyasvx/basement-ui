import { build } from 'esbuild';
import { glob } from 'glob';
import path from 'path';

const getTargetScripts = () =>
  [...glob.sync('src/**/*.ts'), ...glob.sync('src/**/*.tsx')]
    .filter((p) => !p.endsWith('.stories.tsx'))
    .filter((p) => !p.includes('/stories/'))
    .filter((p) => !p.endsWith('.spec.ts'))
    .filter((p) => !p.endsWith('.spec.tsx'));

const transpileScript = () =>
  build({
    format: 'esm',
    entryPoints: getTargetScripts(),
    outdir: 'dist',
    tsconfig: path.resolve('./tsconfig.build.json'),
    plugins: [
      //      copy({
      //        assets: [
      //          {
      //            from: ['./src/**/*.scss'],
      //            to: ['.']
      //          }
      //        ]
      //      })
    ],
  });

transpileScript();
