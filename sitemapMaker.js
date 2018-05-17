const fs = require('nano-fs')
const dir = require('node-dir')
const config = require('./config')
const { writeToFile, filterOnlyMarkdownFiles, configHandlebars } = require('./helpers')

const listOfPosts = []

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
  /* Set the index location */
  return writeToFile(`${config.dirs.templates}/posts`, ordered, `${config.dirs.build}/posts/index.html`)
}

/*
Run the App
 */

/* Set up handlebars first with all the partials and templates loaded */
configHandlebars()

  /* read the directory of posts */
  .then(() => dir.promiseFiles(config.dirs.posts))

  /* write all the posts to file and push them to listOfPosts array  */
  .then(files => files.filter(filterOnlyMarkdownFiles).map(getPosts))

  /* Execute */
  .then(posts => Promise.all(posts))

  /* Build the index page from posts.hbs */
  .then(() => buildPostsIndex())

  /* Get list of all pages as files */
  .then(() => dir.promiseFiles(config.dirs.pages))

  /* Map each file to buildPage */
  .then(files => files.filter(filterOnlyMarkdownFiles).map(buildPage))

  /* Log any errors */
  .catch(e => console.error(e))
