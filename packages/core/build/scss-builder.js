import { build } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export const buildScss = () => {
  build({
    entryPoints: ['src/basement-ui.scss'],
    outdir: 'module',
    plugins: [
      sassPlugin({
        filter: /\.scss$/,
        async transform(source, resolveDir) {
          const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 0 })]).process(source, {
            from: undefined
          });
          return css;
        }
      })
    ]
  });
};
