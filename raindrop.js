const ncp = require('ncp').ncp
const chalk = require('chalk')
const markdown = require('marked')

const path = require('path')
const { promisify } = require('util')

const pwd = process.cwd()
const config = require(path.join(pwd) + '/config.js').config

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
${chalk.blue('Building production site ')}
  `)
  console.log(config.directories.source)
}

/*
Check for root with config file
 */
function configExists () {

}

/*
Copy template files
 */
function copyFiles (name) {
  ncp(path.join(__dirname, '/template'), path.join(pwd, '/', name), function (err) {
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
