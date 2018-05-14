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
  const wp = require('./gulp/write-process')
  wp.run()
}

/*
Dev Mode
 */
const dev = function () {
  const d = require('./gulp/dev-process')
  d.run()
}

/*
Check for root with config file
 */

module.exports = { newproject, write, dev }
