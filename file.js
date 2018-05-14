const fs = require('fs')
// const mkdirp = require('mkdirp')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

function copyFile (file, output) {
  if (!fs.lstatSync(file).isDirectory()) {
    copyFilePromise(file, output)
      .then(() => {
        console.log(chalk.green('copied:  '), output)
      })
  }
}

function copyFilePromise (file, output) {
  return new Promise((resolve, reject) => {
    fs.copyFile(file, output, (err) => {
      err ? reject(err) : resolve(output)
    })
  })
}

function readFile (file, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

function writeFile (file, data) {
  mkdirs(file)
    .then(() => {
      writeToFile(file, data)
        .then(() => {
          console.log(chalk.blue('updated: '), file)
        })
        .catch(error => console.log('Error: ', error))
    })
    .catch(error => console.log('Error: ', error))
}

function mkdirs (path) {
  path = path.substr(0, path.lastIndexOf('/'))
  return new Promise((resolve, reject) => {
    mkdirp(path, (err, data) => {
      err ? reject(err) : resolve(path)
    })
  })
}

function writeToFile (file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

module.exports = { readFile, writeFile, copyFile }
