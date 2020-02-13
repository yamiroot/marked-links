// Librerías node.js
const path = require('path');
const fs = require('fs');
// Librerías de Js
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom; // Destructuración


// path.resolve(root): Devuelve un String.
const pathConvertAbsolute = (newPath) => path.resolve(newPath);


const pathIsAbsolute = (newPath) => {
  // path.isAbsolute(root): Retorna un booleano.

  if (path.isAbsolute(newPath)) {
    return newPath;
  }

  return pathConvertAbsolute(newPath);
};


// path.parse(path): Retorna un objeto.
// path.extname(path): Devuelve la extensión de la ruta. (String)
const validateTypeArchive = (newPath) => path.extname(newPath);


// fs.stats.isFile(): Devuelve un booleano.
const validateArchive = (newPath) => fs.statSync(newPath).isFile();
// console.log(validateArchive('src/index.js'));


// fs.stats.isDirectory(): Devuelve un booleano
const validateDirectory = (newPath) => fs.statSync(newPath).isDirectory();
// console.log(validateDirectory('src'));


const validateMarkdownsArchive = (newPath) => {
  const arrayOfLinksMarkdown = [];

  if (validateTypeArchive(newPath) === '.md') {
    arrayOfLinksMarkdown.push(newPath);
  }

  return arrayOfLinksMarkdown;
};


const validateMarkdownsDirectory = (newPath) => {
  // fs.readdirSync (ruta, opciones): Lee la ruta y devuelve una array de Strings(rutas).
  const arrayPaths = fs.readdirSync(newPath, 'utf-8');
  let arrayOfLinksMarkdown = [];

  arrayPaths.forEach((file) => {
    // path.join([...paths]): Retorna un String.
    const pathName = path.join(newPath, file);

    if (validateDirectory(pathName)) {
      // Al llamar a la función recursiva, crea una nueva variable "arrayLinksMarkdown"
      // porque esta declarada con "let", y esta última solo puede ser usada en la función
      // origen, ya que respeta el alcance de la función. Por ende, no afecta al valor
      // acumulado.

      const array = validateMarkdownsDirectory(pathName);

      arrayOfLinksMarkdown = arrayOfLinksMarkdown.concat(array);
    }

    const arrayArchivesMarkdown = validateMarkdownsArchive(pathName);

    arrayArchivesMarkdown.forEach((markdown) => {
      arrayOfLinksMarkdown.push(markdown);
    });
  });

  return arrayOfLinksMarkdown;
};


const linksOfArchivesMarkdown = (arrayOfLinksMarkdown) => {
  const arrayLinksArchive = [];

  arrayOfLinksMarkdown.forEach((fileMarkdown) => {
    const markdown = fs.readFileSync(fileMarkdown, 'utf-8');
    const tokens = marked.lexer(markdown);
    const html = marked.parser(tokens);
    const dom = new JSDOM(html);

    const linksOfMarkdown = dom.window.document.querySelectorAll('a');

    linksOfMarkdown.forEach((link) => {
      arrayLinksArchive.push({
        href: link.href,
        text: link.text,
        file: fileMarkdown,
      });
    });
  });

  return arrayLinksArchive;
};


const validateLinksStatus = (arrayLinksArchive) => {
  const arrayPromises = [];

  arrayLinksArchive.forEach((link) => {
    const linkEvaluated = link;
    const fetchPromise = fetch(link.href);

    arrayPromises.push(fetchPromise
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          linkEvaluated.status = response.status;
          linkEvaluated.statusText = 'ok';

          return linkEvaluated;
        }

        linkEvaluated.status = response.status;
        linkEvaluated.statusText = 'fail';

        return linkEvaluated;
      })
      .catch((err) => {
        console.log(err);
        linkEvaluated.status = 'ocurrió un error';
        linkEvaluated.statusText = 'fail';

        return linkEvaluated;
      }));
  });

  return Promise.all(arrayPromises);
};


/* console.log(validateLinksStatus([{
  href:
  'https://dzone.com/articles/how-single-page-web-applications-actually-work',
  text: 'SPA',
  file: '/home/administrador/Escritorio/Markdown/Readme.md',
},
{
  href:
  'https://darwindigital.com/mobile-fir-responsive-web-design/',
  text: 'mobile first',
  file: '/home/administrador/Escritorio/Markdown/Readme.md',
},
{
  href:
  'https://darwindicom/mobile-fir-responsive-web-design/',
  text: 'mobile first',
  file: '/home/administrador/Escritorio/Markdown/Readme.md',
}]));
*/


module.exports = {
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateDirectory,
  validateTypeArchive,
  validateMarkdownsArchive,
  validateMarkdownsDirectory,
  linksOfArchivesMarkdown,
  validateLinksStatus,
};

/*
// process.cwd -> Para poner directorio actual de la carpeta respecto a rutas
// comando pwd
*/

// Averiguar Promise.resolve()
