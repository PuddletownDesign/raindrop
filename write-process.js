// const chalk = require('chalk')
const path = require('path')
const gulp = require('gulp')
// const tap = require('gulp-tap')
const hb = require('handlebars')
// const wrap = require('gulp-wrap')
// const declare = require('gulp-declare')
// const concat = require('gulp-concat')
const frontMatter = require('gulp-front-matter')
const markdown = require('gulp-marked')
const tap = require('gulp-tap')
const rename = require('gulp-rename')
// const rename = require('gulp-rename')

/*
Set up
 */
const pwd = process.cwd()
const config = require(path.join(pwd, '/config.js')).config

/*
Gulp set up
 */
const server = path.join(pwd, config.dirs.server)
const pagesDir = path.join(pwd, config.dirs.content, config.dirs.pages)
const pagesMd = path.join(pagesDir, '**/*.md')
const srcDir = path.join(pwd, config.dirs.src)
const templates = path.join(srcDir, config.dirs.templates)

/*
The run function
 */
function run () {
  gulp.start('pages')
}

/*
Get front matter and apply correct template
 */

/*
Compile content pages to html
 */
// gulp.task('pages', function () {
//   return gulp.src(pagesMd)
//     .pipe(frontMatter({property: 'page', remove: true}))
//     .pipe(markdown())
//     .pipe(tap(function (file, t) {
//       var template = hb.compile(file.contents.toString())
//       var html = template({ title: 'Gulp + Handlebars is easy'})
//       file.contents = new Buffer(html, 'utf-8')
//     }))
//     // .pipe(applyTemplate('templates/index.html'))
//     // .pipe(rename({extname: '.html'}))
//     .pipe(gulp.dest(server))
// })

gulp.task('pages', function () {
  // read the template from page.hbs
  return gulp.src(path.join(templates, '/page.hbs'))
    .pipe(tap(function (file) {
      // file is page.hbs so generate template from file
      var template = hb.compile(file.contents.toString())

      // now read all the pages from the pages directory
      return gulp.src(pagesMd)
        .pipe(frontMatter({property: 'page', remove: true}))
        .pipe(markdown())

        .pipe(tap(function (file, page) {
          // file is the converted HTML from the markdown
          // set the contents to the contents property on data
          var data = {
            contents: file.contents.toString(),
            page: file.page
          }
          console.log(file.page)
          // we will pass data to the Handlebars template to create the actual HTML to use
          var html = template(data)
          // replace the file contents with the new HTML created from the Handlebars template + data object that contains the HTML made from the markdown conversion
          file.contents = new Buffer(html, 'utf-8')
        }))
        .pipe(gulp.dest(server))
    }))
})
/*
Set watchers
 */

/*
Move and optimize images
 */

/*
Start hot reloading
 */

/*
Copy CSS
 */

/*
Copy JS
 */

module.exports = { run }
