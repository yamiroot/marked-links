const path = require('path');
const process = require('process');


const {
  pathConvertAbsolute, pathIsAbsolute, validateArchive, validateDirectory,
  validateTypeArchive, validateMarkdownsArchive, validateMarkdownsDirectory,
  linksOfArchivesMarkdown, validateLinksStatus,
} = require('../src/main.js');

const { mdLinks } = require('../src/index.js');


describe('Valido el tipo de ruta recibido.', () => {
  it('Debería ser una función: pathIsAbsolute.', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });

  it('Debería detectar si la ruta recibida es absoluta.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests', '29-ARIA.html');

    expect(pathIsAbsolute(newPath)).toBe(newPath);
  });

  it('Debería ser una función: pathConvertAbsolute.', () => {
    expect(typeof pathConvertAbsolute).toBe('function');
  });

  it('Debería convertir a absoluta, si la ruta recibida es relativa.', () => {
    const newPath = 'Markdown';

    expect(pathIsAbsolute(newPath)).toBe(pathConvertAbsolute(newPath));
  });
});


describe('Valido si recibo un archivo.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateArchive).toBe('function');
  });

  it('Debería detectar si es un archivo.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests', '29-ARIA.html');

    expect(validateArchive(newPath)).toBe(true);
  });
});


describe('Valido si recibo un directorio.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateDirectory).toBe('function');
  });

  it('Debería detectar si es un directorio.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests');

    expect(validateDirectory(newPath)).toBe(true);
  });
});


describe('Valido el tipo de archivo recibido.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateTypeArchive).toBe('function');
  });

  it('Debería detectar si es un archivo md.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests', 'Readme.md');

    expect(validateTypeArchive(newPath)).toBe('.md');
  });

  it('Debería detectar si es un archivo diferente al formato md.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests', '28-detalles.html');

    expect(validateTypeArchive(newPath)).toBe('.html');
  });
});


describe('Valido si el archivo recibido es markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateMarkdownsArchive).toBe('function');
  });

  it('La función debería retornar un array con el markdown encontrado.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests', 'Readme.md');

    expect(validateMarkdownsArchive(newPath)).toStrictEqual([newPath]);
  });
});


describe('Valido si el directorio recibido contiene archivos markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateMarkdownsDirectory).toBe('function');
  });

  it('Debería leer el directorio y devolver un array de archivos/directorios encontrados.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTests');
    const arrayPaths = [
      path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
      path.join(process.cwd(), 'MarkdownForTests', 'TestMarkdown', 'readme.md'),
    ];

    expect(validateMarkdownsDirectory(newPath)).toStrictEqual(arrayPaths);
  });
});


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

  it('Debería devolver un array de un objeto, cuya propiedad status tiene el valor "ocurrió un error".', (done) => validateLinksStatus(linkError).then((response) => {
    const linkErrorStatus = [{
      status: 'ocurrió un error',
      statusText: 'fail',
    }];

    expect(response.status).toBe(linkErrorStatus.status);

    done();
  }));
});


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
});
