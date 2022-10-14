//Templte stuff
document.addEventListener('DOMContentLoaded', function() {
  loadTemplates()
}, false);

const FILE_LOCATION = "assets/index.js"


const LOADING_CONTENT = '' // nothing for empty div
//depercated const LOADING_CONTENT = `<nostyle>We are loading '$TEMPLATE'</nostyle>` 

const LOADING_FAILED_CONTENT = `<nostyle>Failed loading '$TEMPLATE'!</nostyle>`

function loadTemplates() {
  loadTemplate('navbar', (header, prefix) => {
    if (prefix === "" || prefix === "./") return; // dont change links on empty prefix or non realtive.

    fixLinks(header, prefix)
  })
}

function loadTemplate(name, callback) {
  caculateHomeDirPrefix((homeDirPrefix) => {
    let template = document.getElementById(name)

    //depercated 
    //template.innerHTML = LOADING_CONTENT.replace('$TEMPLATE', name)

    //inner fail func
    const failLoading = () => {
      template.innerHTML = LOADING_FAILED_CONTENT.replace('$TEMPLATE', name)
    }

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
  })
}

//TODO: compute links using the current browsers location as a refence. OR using script/css src
function fixLinks(element, prefix) {
  getElementsFromTag(element, 'a', (linkElement) => {
      let oldLink = linkElement.getAttribute('href')

      if (oldLink.startsWith('http')) return;

      let newLink = prefix + oldLink

      linkElement.setAttribute('href', newLink)
  })
}

function caculateHomeDirPrefix(callback) {
  getElementsFromTag(document, 'script', (element) => {
    //TODO write to be safer against redrc attacks
    if (!element.hasAttribute('src')) return

    let srcRef = element.getAttribute('src')

    if (!srcRef.endsWith(FILE_LOCATION)) return

    callback(srcRef.replace(FILE_LOCATION, ''))
  })
}

// shorter fori loop (convience)
function getElementsFromTag(element, tag, callback) {
  let elements = element.getElementsByTagName(tag)

  for (let i = 0; i < elements.length; i++) {
    callback(elements[i])
  }
}
