//Templte stuff
document.addEventListener('DOMContentLoaded', function() {
  loadTemplates()
}, false);

function loadTemplates() {
  loadTemplate("navbar", (header, prefix) => {

    let links = header.getElementsByTagName('a')

    for (let i = 0; i < links.length; i++) {
      let linkElement = links[i]
      let oldLink = linkElement.getAttribute('href')
      let newLink = prefix + oldLink

      linkElement.setAttribute('href', newLink)
    }
  })
}

function loadTemplate(name, callback) {
  let homeDirPrefix = document.documentElement.getAttribute('prefix')
  let template = document.getElementById('navbar')

  fetch(homeDirPrefix + "templates/" + name + ".html").then((respone) => {
    respone.text().then((success) => {
      template.innerHTML = success

      callback(template, homeDirPrefix)
    })
  })
}
