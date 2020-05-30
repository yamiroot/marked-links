const path = require('path');


const {
  validateArchive, validateDirectory, validateTypeArchive, validateMarkdownsArchive,
  validateMarkdownsDirectory,
} = require('../lib/api/validate-markdowns');


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
