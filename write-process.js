const path = require('path')
const gulp = require('gulp')
const hb = require('gulp-handlebars')
const frontMatter = require('gulp-front-matter')
const marked = require('gulp-marked')
const rename = require('gulp-rename')

/*
Set up
 */
const pwd = process.cwd()
const config = require(path.join(pwd, '/config.js')).config

/*
Gulp set up
 */
const output = path.join(pwd, config.dirs.server)
const src = path.join(pwd, config.dirs.content, config.dirs.pages)
const pagesMd = path.join(src, '**/*.md')
const templates = path.join(src, config.dirs.templates)

/*
The run function
 */
function run () {
  gulp.start('pages')
  // console.log(templates)
}

/*
Compile pages to output
 */
gulp.task('pages', function () {
  return gulp.src(pagesMd)
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(marked())
    // .pipe()
    // .pipe(applyTemplate('templates/index.html'))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(output))
})

/*
Move Images
 */

module.exports = { run }
