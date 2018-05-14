const path = require('path')
const gulp = require('gulp')
const tap = require('gulp-tap')
const ignore = require('gulp-ignore')
const bs = require('browser-sync').create()
const markdown = require('./markdown')

/*
Set up
 */
const pwd = process.cwd()
const config = require(path.join(pwd, '/config.js')).config

/*
Input Sources
 */
const server = path.join(pwd, config.dirs.server)
const pagesDir = path.join(pwd, config.dirs.pages)

const mdSources = path.join(pagesDir, '**/*.md')
const fileSources = path.join(pagesDir, '**/*')

/*  */
function run () {
  config.runtime = {}
  config.runtime.pwd = pwd
  gulp.start('watch', ['pages', 'files'])
}

/* Gulp watch */
gulp.task('watch', () => {
  bs.init({
    server: server,
    notify: false
  })
  gulp.watch(fileSources, ['files']).on('change', bs.reload)
  gulp.watch(mdSources, ['pages']).on('change', bs.reload)
})

/* Compile Markdown files */
gulp.task('pages', () => {
  gulp.src(mdSources)
    .pipe(tap(function (file, t) {
      markdown(file.path, config)
    }))
})

/* Copy all non markdown files */
gulp.task('files', () => {
  let exclude = '**/*.md'
  gulp.src(fileSources)
    .pipe(ignore.exclude(exclude))
    .pipe(gulp.dest(server))
})

module.exports = { run }
