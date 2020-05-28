const functionsPathFs = require('./validate-path-fs');
const functionsMarkdowns = require('./validate-markdowns');
const functionsLinks = require('./validate-links');


const {
  validateArchive,
} = functionsPathFs;

const {
  validateMarkdownsDirectory, validateMarkdownsArchive,
} = functionsMarkdowns;

const {
  linksOfArchivesMarkdown, validateLinksStatus,
} = functionsLinks;


const responseValidate = (pathValidated, opts) => {
  if (validateArchive(pathValidated)) {
    const arrayArchivesMarkdown = validateMarkdownsArchive(pathValidated);
    const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

    if (arrayLinksOfMarkdown.length > 0) {
      if ((opts[0] !== undefined) && opts[0].validate) {
        return validateLinksStatus(arrayLinksOfMarkdown);
      }

      return Promise.resolve(arrayLinksOfMarkdown);
    }

    return Promise.resolve('La ruta ingresada corresponde a un archivo que no es markdown.');
  }

  const arrayArchivesMarkdown = validateMarkdownsDirectory(pathValidated);
  const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

  if (arrayLinksOfMarkdown.length > 0) {
    if ((opts[0] !== undefined) && opts[0].validate) {
      return validateLinksStatus(arrayLinksOfMarkdown);
    }

    return Promise.resolve(arrayLinksOfMarkdown);
  }

  return Promise.resolve('La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown.');
};


module.exports = responseValidate;
