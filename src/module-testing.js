/* eslint-disable no-console */


const path = require('path');

const mdLinks = require('../lib/api/index');


// process.cwd(): Método que devuelve el directorio de trabajo actual.


mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown'), { validate: '' })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
