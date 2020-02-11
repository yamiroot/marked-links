// const path = require('path');
// const fs = require('fs');

const {
  pathConvertAbsolute, pathIsAbsolute, validateArchive, validateDirectory, validateTypeArchive,
  validateMarkdownsArchive, validateMarkdownsDirectory, linksOfArchivesMarkdown,
} = require('../src/index.js');


describe('Valido el tipo de ruta recibido.', () => {
  it('Debería ser una función: pathIsAbsolute.', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });

  it('Debería detectar si la ruta recibida es absoluta.', () => {
    const newPath = '/home/administrador/Escritorio/HTML/0-doctype.html';
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
    const newPath = '/home/administrador/Escritorio/HTML/0-doctype.html';
    expect(validateArchive(newPath)).toBe(true);
  });
});


describe('Valido si recibo un directorio.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateDirectory).toBe('function');
  });

  it('Debería detectar si es un directorio.', () => {
    const newPath = '/home/administrador/Escritorio/HTML';
    expect(validateDirectory(newPath)).toBe(true);
  });
});


describe('Valido el tipo de archivo recibido.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateTypeArchive).toBe('function');
  });

  it('Debería detectar si es un archivo md.', () => {
    const newPath = '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/README.md';
    expect(validateTypeArchive(newPath)).toBe('.md');
  });

  it('Debería detectar si es un archivo diferente al formato md.', () => {
    const newPath = '/home/administrador/Escritorio/HTML/7-abreviaturas.html';
    expect(validateTypeArchive(newPath)).toBe('.html');
  });
});


describe('Valido si el archivo recibido es markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateMarkdownsArchive).toBe('function');
  });

  it('La función debería retornar un array con el markdown encontrado.', () => {
    const newPath = '/home/administrador/Escritorio/Markdown/README.md';
    const arrayArchivesMarkdown = ['/home/administrador/Escritorio/Markdown/README.md'];

    if (validateTypeArchive(newPath) === '.md') {
      expect(validateMarkdownsArchive(newPath)).toStrictEqual(arrayArchivesMarkdown);
    }
  });
});


describe('Valido si el directorio recibido contiene archivos markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateMarkdownsDirectory).toBe('function');
  });

  it('Debería leer el directorio y devolver un array de archivos/directorios encontrados.', () => {
    const newPath = '/home/administrador/Escritorio/Markdown';
    const arrayPaths = [
      '/home/administrador/Escritorio/Markdown/Readme.md',
      '/home/administrador/Escritorio/Markdown/TestMarkdown/readme.md',
    ];

    if (validateDirectory(newPath)) {
      expect(validateMarkdownsDirectory(newPath)).toStrictEqual(arrayPaths);
    }
  });
});


describe('Valido la información de los links en cada archivo markdown.', () => {
  it('Debería ser una función.', () => {
    expect(typeof linksOfArchivesMarkdown).toBe('function');
  });

  it('Debería devolver un array de objetos con las propiedades: href, text y file.', () => {
    const arrayPaths = [
      '/home/administrador/Escritorio/Markdown/Readme.md',
      '/home/administrador/Escritorio/Markdown/TestMarkdown/readme.md',
    ];

    const informationLinks = [{
      href:
      'https://dzone.com/articles/how-single-page-web-applications-actually-work',
      text: 'SPA',
      file: '/home/administrador/Escritorio/Markdown/Readme.md',
    },
    {
      href:
      'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
      text: 'mobile first',
      file: '/home/administrador/Escritorio/Markdown/Readme.md',
    },
    {
      href:
      'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
      text: 'import',
      file:
      '/home/administrador/Escritorio/Markdown/TestMarkdown/readme.md',
    },
    {
      href:
      'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export',
      text: 'export',
      file:
      '/home/administrador/Escritorio/Markdown/TestMarkdown/readme.md',
    }];

    expect(linksOfArchivesMarkdown(arrayPaths)).toStrictEqual(informationLinks);
  });
});


/* it('La ruta debería ser un String.', () => {
        const root = 'newruta';
        expect(path.isAbsolute()).toBe('String');
    }); */
