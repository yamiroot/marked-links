const path = require('path');

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


mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown'), { validate: true })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });


module.exports = { mdLinks };
