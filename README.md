# Puddletown Raindrop static site generator

Raindrop is a very simple static site generator. The development builds are highly optimized for page speed.

## Features

-   Frontmatter for meta data
-   Any structure of files and media
-   automatic image opimization for bitmap and svg
-   Blog posts chronologically ordered
-   Separate writing mode and development mode
-   git deployment
-   unbeatable build process/ optimization

## Getting Started

### Install node.js

Make sure you have node.js installed. If not go here.

### Install Raindrop globally

```bash
npm i -g puddletown-raindrop
```

### Create a new project and navigate into it

```bash
raindrop new <nameofyourproject.com>

cd <nameofyourproject.com>
```

### You will be presented with the following folders

```bash
├── config.js # configuration file for the project
├── content # the content for the site goes, writing, images...
└── src # the source files for the theme, js, css, templates...
```

## Raindrop Commands

You can access raindrop help by either just typing `raindrop` or by mistyping a command. Here is the list of commands:

```txt
Getting started:

new <sitename> (template)
                  Create a new project in the current directory
                  (template) is an optional github url

Inside the folder of an existing project:

write             Enter writing mode in the existing project.
                  Just kick back, create some markdown files
                  and some folders. Live previews enabled.

dev               Enter development mode. starts a server with
                  live reload, edit CSS and your templates in
                  real time.

build             Creates a prod directory. This will be the
                  final folder to upload to your live server.

deploy            Deploys the site to live server with various
                  methods depending on how you have your
                  config.js configured. Pushes your prod folder
                  up to live hosting.

_______________________________________________________________

Additional Help   https://github.com/PuddletownDesign/raindrop
```

## Raindrop writing mode

In the root of a raindrop project, let's enter writing mode.

Writing mode is for when you are writing articles, adding images. Writing mode does not check for changes in the `src` folder. 

```bash
raindrop write
```

Here you will get a browser window pop up previewing your site. Adding images or creating or editing the markdown files will display changes instantly.

### Content folder layout

You're more then welcome to change the locations of any of these directories in the config file. You're not tied to any particual folder structure. The basic structure of the content folder is as follows.

```bash
├── drafts # drafts folder. this folder is ingnored. Write drafts here and add them to the appropriate folder when ready for publishing
├── images # Add any global images here. 
├── pages # Static pages, non chronological
└── posts # posting pages, chronologically ordered (like a blog)
```

## Raindrop development mode

In the root of a raindrop project, let's enter development mode.

Development mode is for when you are developing the site theme, templates, css, or global javascript. Developemnt mode checks for changes in the `src` and the `content` folders. 

```bash
raindrop dev
```

Here you will get a browser window pop up previewing your site. Adding images, changing/ adding templates, editing scss or creating or editing the markdown files will display changes instantly.

## Raindrop build

In the root of a raindrop project, let's build out a site ready to be published.

This does not start a server for live previews like `writing` and `dev` modes. Instead this creates a finished production ready folder called `build` (name is editable in the `config.js` file).

```bash
raindrop build
```

This folder is ready to be uploaded to be published. There is also automated build and deployment using git or rsync. We'll get to that shortly.

## Raindrop `config.js`

You have full control to configure all the paths that raindrop will look for files of different types. It's a pretty hackable system.

Opening the config file should give you a pretty good idea of what each variable is for.

One special note:

### Configure deployment

Configuring deployment settings assumes that you have SSH keys for whatever account already. 

First choose if you want to use rsync or git with the `deployment.method` param.

```javascript
'deployment': {

  // choose git or rsync for your preferred method of deplyment (git or rsync). Only one of the below will apply depending on this setting
  'method': 'git',
}
```

### Git Deployment

here we have selected git deployment

Fill in the url of your git repository here. When you are ready to deploy the site, simply type:

```bash
raindrop deploy
```

1.  A new `build` folder will be created
2.  Git will push the `build` folder to the repo

### Rsync deployment

## Modifying the build processes

All optimization build processes are accomplished using gulp. If you would like access to the gulp files to modify them, you can import them into your project directory in the `gulp` folder.

```bash
raindrop gulp
```

From this point forward, build processes will be performed with gulp files in your project directory.
