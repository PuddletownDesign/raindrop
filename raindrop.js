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
      console.log('site created')
    })
}

/*
Server Mode
 */
const server = () => {
  const server = require('./gulp/server')
  server.run()
}

/*
Build
 */
const build = () => {
}

/*
Deploy
 */
const deploy = () => {
}

/*
Gulp
 */
const gulp = () => {
}

function copyTemplate (name) {
  return new Promise((resolve, reject) => {
    ncp(path.join(__dirname, '/template'), path.join(pwd, '/', name), (err) => {
      err ? reject(err) : resolve(name)
    })
  })
}

module.exports = { newproject, server, build, deploy, gulp }
