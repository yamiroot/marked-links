
// Librerías

// marked: Packete que actúa como compilador de bajo nivel para analizar markdowns
// sin almacenar en caché o bloquear durante largos períodos de tiempo. Funciona
// en un navegador, en un servidor o desde una interfaz de línea de comandos (CLI)
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');


// Módulos de node.js

// path: Proporciona utilidades para trabajar con rutas de archivos y directorios.
const path = require('path');
// fs: Proporciona una API para interactuar con el sistema de archivos.
const fs = require('fs');


const { JSDOM } = jsdom; // Destructuración


// token: Cadena de caracteres.


// fs.existsSync(path): Método síncrono. Prueba si la ruta dada existe o no, verificando
// el sistema de archivos. Devuelve true si la ruta existe, false de lo contrario.
const isPathExists = (newPath) => fs.existsSync(newPath);


// path.resolve(path): Convierte una secuencia de rutas o segmentos de ruta en una
// ruta absoluta. Retorna dicha ruta como String.
const pathConvertAbsolute = (newPath) => path.resolve(newPath);


const pathIsAbsolute = (newPath) => {
  // path.isAbsolute(path): Determina si la ruta recibida es absoluta. Retorna un booleano.

  if (path.isAbsolute(newPath)) {
    return newPath;
  }

  return pathConvertAbsolute(newPath);
};


// path.parse(path): Retorna un objeto.

// path.extname(path): Devuelve la extensión de la ruta como String, desde la
// última aparición del carácter . (punto) hasta el final de la cadena. Si no
// hay ningún (.) en la última parte de la ruta, devolverá una cadena vacía.
const validateTypeArchive = (newPath) => path.extname(newPath);


// fs.statSync(path): Devuelve un objeto que proporciona información sobre un archivo.
// stats.isFile(): Devuelve true si el objeto fs.Stats describe un archivo normal.
const validateArchive = (newPath) => fs.statSync(newPath).isFile();
// console.log(validateArchive('src/index.js'));


// fs.statSync(path): Devuelve un objeto que proporciona información sobre un archivo.
// stats.isDirectory(): Devuelve true si el objeto fs.Stats describe un directorio
// del sistema de archivos.
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
  // fs.readdirSync (ruta, opcion): Método síncrono que lee la ruta de un directorio y
  // devuelve un array de rutas de archivos.
  // Parámetros:
  // - path: Ruta del directorio.
  // - opcion: Especifica la codificación de caracteres que se utilizará para los
  // nombres de los archivo devueltos. 'utf-8' determina una codificación en String.
  const arrayPaths = fs.readdirSync(newPath, 'utf-8');

  let arrayOfLinksMarkdown = [];

  arrayPaths.forEach((file) => {
    // path.join([...paths]): Une todos los segmentos de rutas dados juntos usando el
    // separador específico de la plataforma como delimitador, luego normaliza la ruta
    // resultante. Retorna la ruta normalizada como String.
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
    // fs.readFileSync(path, options): Lee sincrónicamente todo el contenido de
    // un archivo y devuelve el contenido de la ruta.
    // Parámetros:
    // - path: Nombre de archivo o descriptor de archivo.
    // - options: Especifica la codificación de caracteres del valor retornado.
    const markdown = fs.readFileSync(fileMarkdown, 'utf-8');

    // marked.lexer(md): Toma un string markdown y llama a las funciones tokeniser.
    // Retorna una serie de tokens.
    // Parámetro:
    // - md: Contenido del archivo markdown.
    const tokens = marked.lexer(markdown);

    // marked.parser(tokens): Toma tokens como entrada y llama a las funciones renderer.
    // Asegura la traducción correcta del token al lenguaje Html.
    // Parámetro:
    // - tokens: Matriz de tokens.
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
      .catch(() => {
        const objetoError = {
          href: linkEvaluated.href,
          file: linkEvaluated.file,
          text: linkEvaluated.text,
          status: 'ocurrió un error',
          statusText: 'fail',
        };

        return objetoError;
      }));
  });

  return Promise.all(arrayPromises);
};


// validateLinksStatus(['//dzone.com/articlpplications-actually-work']);

module.exports = {
  isPathExists,
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
