const ncp = require('ncp').ncp
const chalk = require('chalk')
const path = require('path')
const md = require('marked')

/*
Create a new project
 */
const newproject = function (name) {
  console.log(`${chalk.green('Creating new project: ')} ${name}`)

  copyFiles(name)
}

/* Build out the site */
const build = function () {
  console.log(`
${chalk.blue('Building production site')}
  `)
}

/* Convert Markdown to HTML */
function markdown (file) {
  console.log()
}
/* Copy files to build */

/*
Copy template files
 */
function copyFiles (name) {
  ncp(path.join(__dirname, '/template'), path.join(process.cwd(), '/', name), function (err) {
    if (err) {
      return console.error(err)
    }
    console.log(`
The next step is to cd into the ${name} directory and run npm setup

------------------------------

cd ${name}

npm i

------------------------------
    `)
  })
}

module.exports = { newproject, build }
