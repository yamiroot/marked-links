const path = require('path');
const process = require('process');


const { mdLinks } = require('../src/index.js');


describe('Valido la información y los estados de los links en los archivos Markdown.', () => {
  const informationLinkArchive = [{
    href:
    'https://dzone.com/articles/how-single-page-web-applications-actually-work',
    text: 'SPA',
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
  }, {
    file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
    href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
    text: 'mobile first',
  }];

  const informationLinkStatusArchive = [{
    href:
    'https://dzone.com/articles/how-single-page-web-applications-actually-work',
    text: 'SPA',
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    status: 200,
    statusText: 'ok',
  }, {
    href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
    text: 'mobile first',
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    status: 200,
    statusText: 'ok',
  }];

  const informationLinksDirectory = [{
    href:
    'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
    text: 'import',
    file:
    path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
  },
  {
    href:
    'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
    text: 'export',
    file:
    path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
  }];

  const informationLinksStatusDirectory = [{
    href:
    'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
    text: 'import',
    file:
    path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
    status: 200,
    statusText: 'ok',
  },
  {
    href:
    'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
    text: 'export',
    file:
    path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
    status: 200,
    statusText: 'ok',
  }];

  it('Debería ser una función.', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Si es un archivo y validate es "false", debería retornar un array de objetos con las propiedades: href, text y file.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Si es un archivo y validate es "true", debería retornar un array de objetos con las propiedades: href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  it('Si es un directorio y validate es "false", debería retornar un array de objetos con las propiedades: href, text y file.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(informationLinksDirectory);
      done();
    }));

  it('Si es un directorio y validate es "true", debería retornar un array de objetos con las propiedades: href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown'), { validate: true }).then((response) => {
      expect(response).toStrictEqual(informationLinksStatusDirectory);
      done();
    }));

  it('Si es un archivo y validate es "false", debería retornar un array de objetos con las propiedades: href, text y file.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));
});
