const marked = require('marked')
const chalk = require('chalk')
const fm = require('front-matter')
const handlebars = require('handlebars')
const {readFile, writeFile} = require('./file')
// const {readFile, writeFile} = require('./file')
// const config = require('./config')

function markdown (path, config) {
  /* Read the markdown file */
  path = path.replace(config.runtime.pwd + '/', '')
  readFile(path, 'utf8')
    .then(data => {
      let output = processMarkdown(data, config)
      let templatePath = config.runtime.pwd + '/' + config.dirs.templates + '/' + output.frontmatter.template + '.hbs'

      let dest = destinationPath(path, config)
      /* Read the template file */
      readFile(templatePath, 'utf8')
        .then(data => {
          createTemplate(path, data, output, dest, config)
        })
    })
    .catch(error => console.log('Error: ', error))
}
function destinationPath (path, config) {
  path = path.replace(config.dirs.pages + '/', '')
  path = path.replace('.md', '')
  return path
}
function createTemplate (templatePath, templateData, pageData, dest, config) {
  let template = handlebars.compile(templateData)
  let compiled = template({
    content: pageData.html,
    page: pageData.frontmatter,
    site: config
  })
  writeFile(config.dirs.server + '/' + dest + '.html', compiled)
}

/* Extracting and converting the content */
function processMarkdown (data, config) {
  data = fm(data)
  return {
    frontmatter: data.attributes,
    html: marked(data.body, config.markdown)
  }
}

module.exports = markdown
