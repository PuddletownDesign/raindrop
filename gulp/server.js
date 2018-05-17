const path = require('path')
const gulp = require('gulp')
const tap = require('gulp-tap')
const ignore = require('gulp-ignore')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
// const useref = require('gulp-useref')
const bs = require('browser-sync').create()
const indexMaker = require('../indexMaker')
const postMaker = require('../postMaker')
const pageMaker = require('../pageMaker')

/*
Set up
 */
const pwd = process.cwd()
const config = require(path.join(pwd, '/config.js')).config

/*
Input Sources
 */
/* General directory includes */
const server = path.join(pwd, config.dirs.server)
const contentDir = path.join(pwd, config.dirs.content)
const srcDir = path.join(pwd, config.dirs.src)
const pagesDir = path.join(pwd, config.dirs.pages)
const postsDir = path.join(pwd, config.dirs.posts)
const templatesDir = path.join(pwd, config.dirs.templates)

/* Special Souce files for compiling */
const pageSources = path.join(pagesDir, '**/*.md')
const pageFiles = path.join(pagesDir, '**/*')
const postSources = path.join(postsDir, '**/*.md')
const cssSources = path.join(srcDir, 'scss/**/*.scss')
const jsSources = path.join(srcDir, 'js/app.js')

/* General files to simply copy for preview */
const fileSources = [
  path.join(contentDir, '**/*.*'),
  path.join(pagesDir, '**/*.*'),
  path.join(srcDir, '**/*.*')
]
/* Gulp watch */
gulp.task('watch', () => {
  bs.init({
    server: server,
    notify: false
  })
  gulp.watch(postSources, ['posts', 'postIndex']).on('change', bs.reload)
  gulp.watch(pageSources, ['pages']).on('change', bs.reload)
  gulp.watch(fileSources, ['files']).on('change', bs.reload)
  gulp.watch(templatesDir, ['pages', 'posts', 'postIndex']).on('change', bs.reload)
  gulp.watch(cssSources, ['css']).on('change', bs.reload)
  gulp.watch(jsSources, ['js']).on('change', bs.reload)
})

/*
Run server mode
 */
function run () {
  config.runtime = {}
  config.runtime.pwd = pwd
  gulp.start('watch', ['postIndex', 'posts', 'pages', 'files', 'css', 'js'])
}

/* Make Indexes */
var count = 0
gulp.task('postIndex', () => {
  gulp.src(postSources)
    .pipe(tap(function (file, t) {
      if (count === 0) {
        indexMaker(config)
        count++
      }
    }))
})
/* Compile Posts */
gulp.task('posts', () => {
  gulp.src(postSources)
    .pipe(tap(function (file, t) {
      postMaker(file.path, config)
    }))
})
/* Compile Pages  */
gulp.task('pages', () => {
  gulp.src(pageSources)
    .pipe(tap(function (file, t) {
      pageMaker(file.path, config)
    }))
})

/**
 * Javascript (Webpack)
 */
gulp.task('js', () => {
  gulp.src(jsSources)
    .pipe(gulp.dest(server))
})

/* Copy all non markdown files */
gulp.task('files', () => {
  let exclude = [
    '**/*.md',
    'scss/**/*.*',
    'templates/**/*.*',
    'js/**/*.*',
    'drafts/**/*.*'
  ]
  gulp.src(fileSources)
    .pipe(ignore.exclude(exclude))
    .pipe(gulp.dest(server))
})

gulp.task('js', () => {
  // use a concatenated file solution
  // use source maps
})

gulp.task('css', () => {
  gulp.src(cssSources)
    .pipe(sourcemaps.init())
    .pipe(sass()) // log errors
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(server))
})

module.exports = { run }
