const fs = require('nano-fs')
const fm = require('front-matter')
const moment = require('moment')
const dir = require('node-dir')
const { writeToFile, filterOnlyMarkdownFiles, configHandlebars } = require('./helpers')

const listOfPosts = []
let config = ''

const getListOfPosts = async (filePath) => {
  if (!filterOnlyMarkdownFiles(filePath)) {
    return
  }
  const content = await fs.readFile(filePath, { encoding: 'utf8' })
  const data = fm(content)

  /* Build the page data */
  data.attributes.date = moment(data.attributes.date).format('YYYY-MM-DD') // format the date
  data.page = data.attributes

  data.path = filePath.replace('.md', '.html').replace('content/posts/', '')

  data.config = config
  /* Clean up the data */
  delete data.attributes
  delete data.body
  delete data.frontmatter

  /* Push to the list of posts */
  listOfPosts.push(data)
}

/* Build the posts index file */
const buildPostsIndex = () => {
  const ordered = listOfPosts.sort((a, b) => { // Sort posts in alphabetical order
    /* Check if htmlext is set */
    if (!config.htmlext) {
      a.path = a.path.replace('.html', '')
    }

    const aDate = new Date(a.page.date)
    const bDate = new Date(b.page.date)

    if (aDate > bDate) return -1
    else if (aDate < bDate) return 1
    return 0
  })
  let data = {}
  data.posts = ordered
  data.root = '../'

  /* Set the index location */
  return writeToFile(`${config.dirs.templates}/posts`, data, `${config.dirs.server}/posts/index.html`)
}

/*
Run the App
 */

/* Set up handlebars first with all the partials and templates loaded */
function indexMaker (c) {
  config = c

  configHandlebars(c)

    /* read the directory of posts */
    .then(() => dir.promiseFiles(config.dirs.posts))

    /* write all the posts to file and push them to listOfPosts array  */
    .then(files => files.filter(filterOnlyMarkdownFiles).map(getListOfPosts))

    /* Execute */
    .then(posts => Promise.all(posts))

    /* Build the index page from posts.hbs */
    .then(() => buildPostsIndex())

    /* Log any errors */
    .catch(e => console.error(e))
}
module.exports = indexMaker
