const myFunctions = require('../src/main.js');

const {
  validateMarkdownsDirectory, validateArchive,
  linksOfArchivesMarkdown, validateLinksStatus, validateMarkdownsArchive,
} = myFunctions;


const mdLinks = (newPath, opts) => {
  const pathValidated = myFunctions.pathIsAbsolute(newPath);

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
};


module.exports = { mdLinks };
