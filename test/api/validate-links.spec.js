const path = require('path');

const {
  linksOfArchivesMarkdown, validateLinksStatus,
} = require('../../lib/api/validate-links');


describe('Testing de función linksOfArchivesMarkdown', () => {
  it('linksOfArchivesMarkdown debería ser una función.', () => {
    expect(typeof linksOfArchivesMarkdown).toBe('function');
  });

  it('Debería retornar un array de objetos con las propiedades: href, text y file; correspondiente al array de rutas de archivos markdown recibido.', () => {
    const arrayPaths = [
      path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
      path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
    ];

    const informationLinks = [{
      href: 'https://dzone.com/articles/huwork',
      text: 'SPA',
      file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
    }, {
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
      text: 'import',
      file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
    }, {
      href: 'aabbcc123',
      text: 'export',
      file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
    }];

    expect(linksOfArchivesMarkdown(arrayPaths)).toStrictEqual(informationLinks);
  });
});


describe('Testing de función validateLinksStatus', () => {
  const linkCorrect = [{
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
    text: 'import',
    file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
  }];

  const linkIncorrect = [{
    href: 'https://dzone.com/articles/huwork',
    text: 'SPA',
    file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
  }];

  const linkError = [{
    href: 'aabbcc123',
    text: 'export',
    file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
  }];


  it('validateLinksStatus debería ser una función.', () => {
    expect(typeof validateLinksStatus).toBe('function');
  });

  it('Debería devolver un array de un objeto cuyas propiedades son: href, text, file, status: "200", statusText: "ok"; correspondiente al array de link recibido.', (done) => validateLinksStatus(linkCorrect)
    .then((response) => {
      const linkCorrectStatus = [{
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
        text: 'import',
        file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
        status: 200,
        statusText: 'ok',
      }];

      expect(response).toStrictEqual(linkCorrectStatus);

      done();
    }));

  it('Debería devolver un array de un objeto, cuyas propiedades son: href, text, file, status: "404", statusText: "fail"; correspondiente al array de link recibido.', (done) => validateLinksStatus(linkIncorrect)
    .then((response) => {
      const linkIncorrectStatus = [{
        href: 'https://dzone.com/articles/huwork',
        text: 'SPA',
        file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
        status: 404,
        statusText: 'fail',
      }];

      expect(response).toStrictEqual(linkIncorrectStatus);

      done();
    }));


  it('Debería devolver un array de un objeto, cuyas propiedades son: href, text, file, status: "ocurrió un error", statusText: "fail"; correspondiente al array de link recibido.', (done) => validateLinksStatus(linkError)
    .then((response) => {
      const linkErrorStatus = [{
        href: 'aabbcc123',
        text: 'export',
        file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
        status: 'ocurrió un error',
        statusText: 'fail',
      }];

      expect(response).toStrictEqual(linkErrorStatus);

      done();
    }));
});
