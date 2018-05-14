#! /usr/bin/env node

const raindrop = require('./raindrop')
const chalk = require('chalk')
const log = console.log

const [,, ...args] = process.argv

// Create a new site
if (args[0] === 'new') {
  if (typeof args[1] === 'undefined') {
    log(`
${chalk.red('You have to enter a name for your project')}

ex. ${chalk.blue('raindrop new mysite.com')}
    `)
  } else {
    raindrop.newproject(args[1])
  }
}

// enter writing mode
else if (args[0] === 'serve') {
  log(`
${chalk.blue('Entering server mode')}
  `)
  raindrop.server()
}

//  Build site
else if (args[0] === 'build') {
  // raindrop.build()
  log(`
  ${chalk.red('Build mode not complete yet')}
    `)
}

//  Deploy site
else if (args[0] === 'deploy') {
  log(`
${chalk.red('Deployment mode not complete yet')}
  `)
}

// print help
else {
  log(`
${chalk.cyan.bold('Puddletown Raindrop')} 💧

A simple and highly optimized static site generator. 

Written by Puddletown Design in nodejs.

_______________________________________________________________

List of Commands:

${chalk.magenta('Getting started:')}

${chalk.cyan('new <sitename> (template)')}       
                  Create a new project in the current directory
                  (template) is an optional github url

${chalk.magenta('Inside the folder of an existing project:')}

${chalk.cyan('server')}            Enter server mode in the existing project.
                  Just kick back, create some markdown files 
                  and some folders. Live previews enabled.

${chalk.cyan('build')}             Creates a prod directory. This will be the 
                  final folder to upload to your live server.

${chalk.cyan('deploy')}            Deploys the site to live server with various
                  methods depending on how you have your 
                  config.js configured. Pushes your prod folder 
                  up to live hosting.
            
${chalk.magenta('Hacking:')}

${chalk.cyan('gulp')}              Import the gulpfiles into your project directory 
                  and modify the build process to your likiing.
                      
_______________________________________________________________

${chalk.cyan('Additional Help')}   https://github.com/PuddletownDesign/raindrop
  `)
}
