//Templte stuff
document.addEventListener('DOMContentLoaded', function() {
  loadTemplates()
}, false);

const LOADING_CONTENT = `<nostyle>We are loading '$TEMPLATE'<nostyle>`

const LOADING_FAILED_CONTENT = `<nostyle>Failed loading '$TEMPLATE'!<nostyle>`

function loadTemplates() {
  loadTemplate('navbar', (header, prefix) => {
    if (prefix === "" || prefix === "./") return; // dont change links on empty prefix or non realtive.

    fixLinks(header, prefix)
  })
}

function loadTemplate(name, callback) {
  let homeDirPrefix = document.documentElement.getAttribute('prefix')
  let template = document.getElementById(name)

  template.innerHTML = LOADING_CONTENT.replace('$TEMPLATE', name)

  fetch(homeDirPrefix + 'templates/' + name + '.html').then((respone) => {
    if (respone.status > 399) {
      failLoading(template, name)
      return
    }

    respone.text().then((success) => {
      template.innerHTML = success

      callback(template, homeDirPrefix)
    })
  }).catch((failed) => {
    failLoading(template, name)
  })
}

function failLoading(template, name) {
  template.innerHTML = LOADING_FAILED_CONTENT.replace('$TEMPLATE', name)
}

//TODO: compute links using the current browsers location as a refence.
function fixLinks(element, prefix) {
    let links = element.getElementsByTagName('a')

    for (let i = 0; i < links.length; i++) {
      let linkElement = links[i]
      let oldLink = linkElement.getAttribute('href')

      if (oldLink.startsWith('http')) continue;

      let newLink = prefix + oldLink

      linkElement.setAttribute('href', newLink)
    }
}
