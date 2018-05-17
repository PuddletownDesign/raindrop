const handlebars = require('handlebars')
const fs = require('nano-fs')
const dateformat = require('handlebars-dateformat')
const path = require('path')

/* Configure handlebars */
const configHandlebars = async (c) => {
  registerHelpers()
  await registerPartials(c)
}

/* Register the hanlebars helpers */
const registerHelpers = () => handlebars.registerHelper(
  'dateformat', dateformat
)

/* Register the handlebars partial files */
const registerPartials = async (config) => {
  const files = await fs.readdir('./' + config.dirs.partials)

  /* Read each file */
  files.forEach(async (file) => {
    const content = await fs.readFile(`${config.dirs.partials}/${file}`, 'utf8')
    const filename = file.substring(0, file.lastIndexOf('.'))
    handlebars.registerPartial(filename, content)
  })
}

/* Filter only markdown files. .md extensions */
const filterOnlyMarkdownFiles = (file) => {
  const ext = path.extname(file)
  return (ext === '.md')
}

/* Write the handlebars file */
const writeToFile = async (template, data, filePath) => {
  // console.log('writing file:', filePath)
  const html = await renderTemplate(template, data)
  const dirPath = filePath.substr(0, filePath.lastIndexOf('/') + 1)
  await fs.mkpath(dirPath)
  return fs.writeFile(`${filePath}`, html, { encoding: 'utf8' })
}

/* Render the template */
const renderTemplate = async (templatePath, viewData) => {
  const content = await fs.readFile(`${templatePath}.hbs`, { encoding: 'utf-8' })
  const template = handlebars.compile(content)
  return template(viewData)
}

/* Get the root site url based on the page's location */
function rootURL (current, config) {
  let root = current.replace(process.cwd() + '/content/', '')

  let count = ((root.match(new RegExp('/', 'g')) || []).length)
  root = ''
  for (let i = 0, c = count; i < c; i++) {
    root += '../'
  }
  return root
}

module.exports = { writeToFile, filterOnlyMarkdownFiles, configHandlebars, rootURL }
