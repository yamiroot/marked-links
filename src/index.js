const myFunctions = require('./main.js');

const {
  validateMarkdownsDirectory, validateArchive, isPathExists,
  linksOfArchivesMarkdown, validateLinksStatus, validateMarkdownsArchive,
} = myFunctions;


const mdLinks = (newPath, opts) => {
  const pathValidated = myFunctions.pathIsAbsolute(newPath);

  if (isPathExists(newPath)) {
    if (validateArchive(pathValidated)) {
      const arrayArchivesMarkdown = validateMarkdownsArchive(pathValidated);
      const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

      if (opts.validate) {
        return validateLinksStatus(arrayLinksOfMarkdown);
      }

      return Promise.resolve(arrayLinksOfMarkdown);
    }

    const arrayArchivesMarkdown = validateMarkdownsDirectory(pathValidated);
    const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

    if (opts.validate) {
      return validateLinksStatus(arrayLinksOfMarkdown);
    }

    return Promise.resolve(arrayLinksOfMarkdown);
  }

  return Promise.reject(new Error('La ruta ingresada no existe.'));
};


module.exports = { mdLinks };
