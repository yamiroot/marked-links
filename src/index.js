// Librerías node.js
const path = require('path');
const fs = require('fs');

// Librerías de Nodejs
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

    if (validateArchive(pathName)) {
      const arrayArchivesMarkdown = validateMarkdownsArchive(pathName);

      arrayArchivesMarkdown.forEach((markdown) => {
        arrayOfLinksMarkdown.push(markdown);
      });
    }
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

  /*   console.log(arrayLinksArchive);
  console.log(arrayLinksArchive.length); */

  return arrayLinksArchive;
};


const validateLinksStatus = (arrayLinksArchive) => {
  const arrayLinksInformation = [];

  arrayLinksArchive.forEach((link) => {
    const linkEvaluated = link;
    const fetchPromise = fetch(link.href);

    fetchPromise
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          linkEvaluated.status = response.status;
          linkEvaluated.statusText = 'ok';

          arrayLinksInformation.push(linkEvaluated);
        }

        if (response.status >= 400 || response.status < 200) {
          linkEvaluated.status = response.status;
          linkEvaluated.statusText = 'fail';

          arrayLinksInformation.push(linkEvaluated);
        }

        console.log('Retorno then: ', arrayLinksInformation);

        return arrayLinksInformation;
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  });

  return null;
};


console.log(validateLinksStatus([{
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

/*
fetchPromise
      .then((response) => {
        // link.status = response.status;
        // link.push(response.status);

        const arrayLinksInformation = [];

        if (response.status >= 200 && response.status < 400) {
        Object.defineProperties(link, {
            status: { value: response.status, writable: false },
            statusText: { value: 'ok', writable: false },
          });
          console.log(link.statusText, ' ', link.status);
          console.log(link);

         arrayLinksInformation.push({
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          statusText: 'ok',
        });
      }

      if (response.status >= 400 && response.status < 200) {
        /* Object.defineProperties(link, {
          status: { value: response.status, writable: false },
          statusText: { value: 'fail', writable: false },
        }); 

        arrayLinksInformation.push({
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          statusText: 'fail',
        });

        // console.log(link.statusText, ' ', link.status);
        console.log(arrayLinksInformation);
      }
    })
*/

const mdLinks = (newPath) => {
  if ((typeof newPath) === 'string') {
    const pathValidated = pathIsAbsolute(newPath);

    if (validateDirectory(pathValidated)) {
      const arrayLinksOfDirectory = validateMarkdownsDirectory(pathValidated);

      const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayLinksOfDirectory);

      validateLinksStatus(arrayLinksOfMarkdown);
    }

    if (validateArchive(pathValidated)) {
      const arrayLinksOfArchive = validateMarkdownsArchive(pathValidated);

      const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayLinksOfArchive);

      validateLinksStatus(arrayLinksOfMarkdown);
    }
  }

  return null;
};


// mdLinks('/home/administrador/Escritorio/Markdown');


module.exports = {
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateDirectory,
  validateTypeArchive,
  validateMarkdownsArchive,
  validateMarkdownsDirectory,
  linksOfArchivesMarkdown,
};


/*
Pendiente hoy:
fetch debe estar en otra función.
Pruebo fetch, y fetch recibe una url. Esta url esta en el objeto de links gg.
Debo probar fetch en cada link.
*/

// 200 - 359 - ok;

// status: numero
// ok: ok / fail


/*
// process.cwd -> Para poner directorio actual de la carpeta respecto a rutas
// comando pwd
*/
