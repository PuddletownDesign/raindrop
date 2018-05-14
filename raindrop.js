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
Server Mode
 */
const server = function () {
  const server = require('./gulp/server')
  server.run()
}

/*
Check for root with config file
 */

module.exports = { newproject, server }
