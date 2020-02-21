
const {
  pathIsAbsolute, validateArchive, validateMarkdownsArchive, validateMarkdownsDirectory,
  linksOfArchivesMarkdown, validateLinksStatus,
} = require('../src/main.js');

const mdLinks = (newPath, opts) => {
  const pathValidated = pathIsAbsolute(newPath);

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
