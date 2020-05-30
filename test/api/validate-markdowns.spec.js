const path = require('path');


const {
  validateMarkdownsArchive, validateMarkdownsDirectory,
} = require('../../lib/api/validate-markdowns');


describe('Testing de función validateMarkdownsArchive', () => {
  it('validateMarkdownsArchive debería ser una función.', () => {
    expect(typeof validateMarkdownsArchive).toBe('function');
  });

  it('Debería retornar un array con la ruta del archivo markdown recibido.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Readme.md');

    expect(validateMarkdownsArchive(newPath)).toStrictEqual([newPath]);
  });

  it('Debería retornar un array vacío porque la ruta recibida no corresponde a un archivo markdown.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'details.html');

    expect(validateMarkdownsArchive(newPath)).toStrictEqual([]);
  });
});


describe('Testing de función validateMarkdownsDirectory', () => {
  it('validateMarkdownsDirectory debería ser una función.', () => {
    expect(typeof validateMarkdownsDirectory).toBe('function');
  });

  it('Debería retornar un array con las rutas de los archivos markdowns encontrados en el directorio.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest');
    const arrayPaths = [
      path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
      path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
    ];

    expect(validateMarkdownsDirectory(newPath)).toStrictEqual(arrayPaths);
  });
});
