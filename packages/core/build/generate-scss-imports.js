import glob from 'glob';
import fs from 'fs';
import os from 'os';
import path from 'path';

const createImportStatement = path => {
  const p = path.replace('src/', './');
  return `@use '${p}';`;
};

const files = [
  ...glob.sync('src/component/**/*.scss'),
  ...glob.sync('src/form-items/**/*.scss'),
  ...glob.sync('src/element/**/*.scss'),
  ...glob.sync('src/layout/**/*.scss')
]
  // .filter(f => f.match(/^src\/.*\//))
  .map(p => createImportStatement(p));

export const generateScssImports = () => {
  try {
    fs.writeFileSync(path.resolve('./src/_all-components.scss'), files.join(os.EOL) + os.EOL);
  } catch (e) {
    console.log(e.message);
  }
};
