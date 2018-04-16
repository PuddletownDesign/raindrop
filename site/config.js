const config = {

  //  choose your preferred package manager
  'pm': 'pnpm',

  // Set up site data
  'site': {
    'name': 'raindrop template',
    'author': 'Brent',
    'email': 'puddletowndesign@gmail.com'
  },

  // Set up directories
  'dirs': {
    // the directory of the source code
    'src': 'src',

    // directory of the templates folder in the source folder
    'templates': 'templates',

    // the name of the directory of the build when running local server
    // make sure to gitignore this directory if you change the name
    'server': '.server',

    // the name of the directory to be created when building/ deploying site
    // Leaving this value blank will output the site name ex. mysite.com
    'production': '',

    // the name of the folder that holds the content for the site
    'content': 'content',

    // the name of the folder that creates static pages
    'pages': 'pages',

    // the name of the folder that creates chronological blog posts based on front matter date
    'posts': 'posts'
  },

  // Configure deplyment settings. Note you will need to have SSH access and/ or a remote git repo set up. If you don't have SSH access, you can just run build to create your production folder, then ftp or upload that folder however you want. The 'prod' folder will be the static site.
  'deployment': {

    // you preferred method of deplyment (git or rsync). Only one of the below will apply depending on this setting
    'method': 'git',

    // set up git deployment
    'git': {

      // the url to track changes on github/ development
      'github': '',

      // the url to deploy the final prod folder to
      'production': ''
    },

    // using rsync instead
    'rsync': {

      // the production url to deploy the site to
      'production': ''
    }
  }
}

module.exports = { config }
