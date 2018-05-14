const path = require('path')
const gulp = require('gulp')
const tap = require('gulp-tap')
const ignore = require('gulp-ignore')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const bs = require('browser-sync').create()
const pages = require('../pages-converter')
// const posts = require('../posts-converter')

/*
Set up
 */
const pwd = process.cwd()
const config = require(path.join(pwd, '/config.js')).config

/*
Input Sources
 */
const server = path.join(pwd, config.dirs.server)
const contentDir = path.join(pwd, config.dirs.content)
const pagesDir = path.join(pwd, config.dirs.pages)
const srcDir = path.join(pwd, config.dirs.src)

const mdSources = path.join(pagesDir, '**/*.md')
const fileSources = [
  path.join(contentDir, '**/*.*'),
  path.join(pagesDir, '**/*.*'),
  path.join(srcDir, '**/*.*')
]
const cssSources = path.join(srcDir, 'scss/**/*.scss')
const jsSources = path.join(srcDir, 'js/**/*.js')
const templateSources = path.join(srcDir, 'templates/*.hbs')

/*  */
function run () {
  config.runtime = {}
  config.runtime.pwd = pwd

  gulp.start('watch', ['pages', 'files', 'js', 'css'])
}

/* Gulp watch */
gulp.task('watch', () => {
  bs.init({
    server: server,
    notify: false
  })
  gulp.watch(fileSources, ['files']).on('change', bs.reload)
  gulp.watch(mdSources, ['pages']).on('change', bs.reload)
  gulp.watch(templateSources, ['pages']).on('change', bs.reload)
  gulp.watch(cssSources, ['css']).on('change', bs.reload)
  gulp.watch(jsSources, ['js']).on('change', bs.reload)
})

/* Compile Markdown files */
gulp.task('pages', () => {
  gulp.src(mdSources)
    .pipe(tap(function (file, t) {
      pages(file.path, config)
    }))
})

/* Copy all non markdown files */
gulp.task('files', () => {
  let exclude = [
    '**/*.md',
    'scss/**/*.*',
    'templates/**/*.*',
    'js/**/*.*',
    'drafts/**/*.*',
    'pages/**/*.*',
    'posts/**/*.*'
  ]
  gulp.src(fileSources)
    .pipe(ignore.exclude(exclude))
    .pipe(gulp.dest(server))
})

gulp.task('js', () => {

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
