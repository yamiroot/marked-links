const path = require('path');

const {
  linksOfArchivesMarkdown, validateLinksStatus,
} = require('../src/main.js');


describe('Obtengo la información de los links en cada archivo markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof linksOfArchivesMarkdown).toBe('function');
  });

  it('Debería devolver un array de objetos con las propiedades: href, text y file.', () => {
    const arrayPaths = [
      path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
      path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
    ];

    const informationLinks = [{
      href:
        'https://dzone.com/articles/how-single-page-web-applications-actually-work',
      text: 'SPA',
      file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    },
    {
      href:
        'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
      text: 'mobile first',
      file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    },
    {
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

    expect(linksOfArchivesMarkdown(arrayPaths)).toStrictEqual(informationLinks);
  });
});


describe('Valido el estado de los links en cada archivo markdown.', () => {
  const linkCorrect = [{
    href:
      'https://dzone.com/articles/how-single-page-web-applications-actually-work',
    text: 'SPA',
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
  }];


  const linkIncorrect = [{
    href:
      'https://dzone.com/articlpplications-actually-work',
    text: 'SPA',
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
  }];

  const linkError = [{
    href:
      '//dzone.com/articlpplications-actually-work',
  }];

  it('Debería ser una función.', () => {
    expect(typeof validateLinksStatus).toBe('function');
  });

  it('Debería devolver un array de un objeto, cuyas propiedades son: href, text, file, status: "200", statusText: "ok".', (done) => validateLinksStatus(linkCorrect).then((response) => {
    const linkCorrectStatus = [{
      href:
        'https://dzone.com/articles/how-single-page-web-applications-actually-work',
      text: 'SPA',
      file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
      status: 200,
      statusText: 'ok',
    }];

    expect(response).toStrictEqual(linkCorrectStatus);

    done();
  }));

  it('Debería devolver un array de un objeto, cuyas propiedades son: href, text, file, status: "404", statusText: "fail".', (done) => validateLinksStatus(linkIncorrect).then((response) => {
    const linkIncorrectStatus = [{
      href:
        'https://dzone.com/articlpplications-actually-work',
      text: 'SPA',
      file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
      status: 404,
      statusText: 'fail',
    }];

    expect(response).toStrictEqual(linkIncorrectStatus);

    done();
  }));

  it('Debería devolver un array de un objeto, cuya propiedad status tiene el valor "ocurrió un error".', () => {
    try {
      validateLinksStatus(linkError);
    } catch (error) {
      expect(error).toStrictEqual(new TypeError('Invalid URL'));
    }
  });
});
