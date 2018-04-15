import $ from 'jquery'

// import utils from './calc'
// import cleanurl from './cleanurl'

/* Highlight JS Language loader */
import hljs from 'highlight.js/lib/highlight'
['javascript', 'css', 'bash'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})
hljs.initHighlightingOnLoad()

/* Example jQuery Loader */
$('h1').text('Puddletown UI Bootstrap 👢')
