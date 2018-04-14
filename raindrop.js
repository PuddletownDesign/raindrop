const commander = require('commander')

// Converts value to lowercase
function toLower (v) {
  return v.toLowerCase()
}

const newsite = () => {
  console.log('creating new site')
}

// Export all methods
module.exports = { newsite }
