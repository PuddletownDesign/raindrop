/*
Included Libs
 */
const chalk = require('chalk')
const ncp = require('ncp')

/*
Native libs
 */
const path = require('path')

/*
Set up
 */
const pwd = process.cwd()

/*
Build Processes
 */

/*
Create a new project
 */
const newproject = function (name) {
  copyTemplate(name)
    .then(() => {
      console.log(`
Creating ${name}...
        
next change directories into your new project:
        
cd ${name}
      `)
    })
}

/*
Writing Mode
 */
const write = function () {
  const wp = require('./write-process')
  wp.run()
}

/*
Dev Mode
 */
const dev = function () {
  const d = require('./dev-process')
  d.run()
}

/*
Check for root with config file
 */

/*
Copy template files
 */
function copyTemplate (name) {
  return new Promise((resolve, reject) => {
    ncp(path.join(__dirname, '/template'), path.join(pwd, '/', name), (err) => {
      err ? reject(err) : resolve(name)
    })
  })
}

module.exports = { newproject, write, dev }
