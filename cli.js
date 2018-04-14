#! /usr/bin/env node

const chalk = require('chalk')

const log = console.log
const { spawn } = require('child_process')
const [,, ...args] = process.argv

// Create a new site
if (args[0] === 'new') {
  if (typeof args[1] === 'undefined') {
    log(`
${chalk.red('You have to enter a name for your project')}

ex. ${chalk.blue('raindrop new mysite.com')}
    `)
  } else {
    log(`
${chalk.green('Creating new project: ')} ${chalk.white(args[1])}  
    `)
  }
}

// enter writing mode
else if (args[0] === 'write') {
  log(`
${chalk.blue('Entering writing mode')}
`)
}

// Enter Development mode
else if (args[0] === 'dev') {
  log(`
${chalk.blue('Entering development mode')}
  `)
}

//  Build site
else if (args[0] === 'build') {
  log(`
${chalk.blue('Building production site')}
  `)
}

//  Deploy site
else if (args[0] === 'deploy') {
  log(`
${chalk.blue('Deploying to live server')}
  `)
}

// print help
else {
  log(`
${chalk.cyan.bold('Puddletown Raindrop')} 💧

Static site generator built in nodejs

_______________________________________________________________

List of Commands:

${chalk.cyan('new <sitename> ')}       Create a new project in the current directory

${chalk.cyan('write')}                 Enter writing mode in the existing project
                      all files will be compiled for live preview on save

${chalk.cyan('dev')}                   Enter development mode. starts a server with live reload                      
  
${chalk.cyan('build')}                 creates a prod directory. compiles and optimizes all files
                      for deployment

${chalk.cyan('deploy')}                deploys the site to live server with various methods
                      depending on how you have your config.js configured.
                      
_______________________________________________________________

${chalk.cyan('Additional Help')}       https://github/PuddletownDesign/puddletown-raindrop
  `)
}
