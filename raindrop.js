const ncp = require('ncp').ncp
const chalk = require('chalk')
const path = require('path')

/*
Create a new project
 */
const newproject = function (name) {
  console.log(`${chalk.green('Creating new project: ')} ${name}`)

  copyFiles(name)

  console.log(`
The next step is to cd into the ${name} directory and run npm setup

------------------------------
cd ${name}

npm i
------------------------------
  `)
}

/*
Copy template files
 */
function copyFiles (name) {
  ncp(path.join(__dirname, '/template'), path.join(process.cwd(), '/', name), function (err) {
    if (err) {
      return console.error(err)
    }
  })
}

module.exports = {newproject}
