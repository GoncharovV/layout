/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');

const { task, src, dest, series, parallel } = require('gulp');
const { rimrafSync } = require('rimraf');
const utils = require('@gravity-ui/gulp-utils');


const BUILD_DIR = path.resolve('dist');

task('clean', (done) => {
  rimrafSync(BUILD_DIR);
  rimrafSync('styles/**/*.scss', { glob: true });
  done();
});

async function compileTs(modules = false) {
  const tsProject = await utils.createTypescriptProject({
    configName: 'tsconfig.gulp.lib.json',
    compilerOptions: {
      declaration: true,
      module: modules ? 'esnext' : 'nodenext',
      moduleResolution: modules ? 'bundler' : 'nodenext',
      ...(modules ? undefined : { verbatimModuleSyntax: false }),
    },
  });


  return new Promise((resolve) => {
    const filterFiles = ['lib/**/*.{ts,tsx}'];

    src(filterFiles)
      .pipe(
        tsProject({}),
      )
      .pipe(dest(path.resolve(BUILD_DIR)))
      .on('end', resolve);
  });
}

task('compile-to-esm', () => {
  return compileTs(true);
});


task('componentStyles', () => {
  return src(['lib/components/**/*.css'])
    .pipe(dest(path.resolve(BUILD_DIR, 'components')));
});

task('copyRawCssToStyles', () => {
  return src('lib/styles/**/*.css', { base: 'lib/styles' }).pipe(
    dest(path.resolve(BUILD_DIR, 'styles')),
  );
});


task(
  'build',
  series([
    'clean',
    'compile-to-esm',
    parallel(['componentStyles', 'copyRawCssToStyles']),
  ]),
);

task('default', series(['build']));
