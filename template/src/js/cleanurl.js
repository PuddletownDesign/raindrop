const cleanurl = {
  lowercase: (str) =>
    str.toLowerCase(),

  replaceSpacesWithHyphens: (str) =>
    str.replace(/\s+/g, '-'),

  replaceSpecialCharaters: (str) =>
    str.replace(/[^\w\s]/gi, ''),

  make: (str) =>
    cleanurl.lowercase(
      cleanurl.replaceSpacesWithHyphens(
        cleanurl.replaceSpecialCharaters(str)
      )
    )
}

module.exports = cleanurl
