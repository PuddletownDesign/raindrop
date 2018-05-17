const fm = require('front-matter')
const marked = require('marked')
const fs = require('nano-fs')
const moment = require('moment')
const { writeToFile, filterOnlyMarkdownFiles, configHandlebars, rootURL } = require('./helpers')

/* Construct the post made */
const buildPost = async (filePath, config) => {
  if (!filterOnlyMarkdownFiles(filePath)) {
    return
  }
  const content = await fs.readFile(filePath, { encoding: 'utf8' })
  const data = fm(content)

  /* Build the page data */
  data.attributes.date = moment(data.attributes.date).format('YYYY-MM-DD') // format the date
  data.page = data.attributes
  data.content = marked(data.body) // markdown the body and assign to data
  data.path = filePath.replace('.md', '.html').replace('posts/', '')
  data.config = config
  data.root = rootURL(filePath, config)

  /* Clean up the data */
  delete data.attributes
  delete data.body
  delete data.frontmatter

  /* Adjust absolute gulp input URL */
  filePath = filePath.replace(process.cwd() + '/' + config.dirs.content + '/', '')
  const outputPath = `${config.dirs.server}/${filePath}`.replace('.md', '.html') // set the output path for the file
  const template = `${config.dirs.templates}/${data.page.template}` // set the proper template to use

  return writeToFile(template, data, outputPath) // write the file with handlebars
}

/*
Run the App
 */

/* Set up handlebars first with all the partials and templates loaded */
const postMaker = (path, config) => {
  configHandlebars(config)

    /* write the file to a template */
    .then(buildPost(path, config))

    /* Log any errors */
    .catch(e => console.error(e))
}

module.exports = postMaker
