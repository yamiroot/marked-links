
// Librerías

// marked: Packete que actúa como compilador de bajo nivel para analizar markdowns
// sin almacenar en caché o bloquear durante largos períodos de tiempo. Funciona
// en un navegador, en un servidor o desde una interfaz de línea de comandos (CLI)
const marked = require('marked');
// token: Cadena de caracteres.
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom; // Destructuración


// Módulos de node.js

// fs: Proporciona una API para interactuar con el sistema de archivos.
const fs = require('fs');


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


module.exports = {
  linksOfArchivesMarkdown,
  validateLinksStatus,
};
