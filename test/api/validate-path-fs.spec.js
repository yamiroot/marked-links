const path = require('path');


const {
  isPathExists, pathConvertAbsolute, pathIsAbsolute, validateTypeArchive,
  validateArchive, validateDirectory,
} = require('../../lib/api/validate-path-fs');


describe('Testing de función isPathExists', () => {
  it('isPathExists debería ser una función.', () => {
    expect(typeof isPathExists).toBe('function');
  });

  it('Si la ruta recibida existe, isPathExists devuelve true.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Void');

    expect(isPathExists(newPath)).toBe(true);
  });

  it('Si la ruta recibida no existe, isPathExists devuelve false.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'NoExists');

    expect(isPathExists(newPath)).toBe(false);
  });
});


describe('Testing de función pathIsAbsolute y pathConvertAbsolute', () => {
  it('pathIsAbsolute debería ser una función.', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });

  it('pathConvertAbsolute debería ser una función.', () => {
    expect(typeof pathConvertAbsolute).toBe('function');
  });

  it('Debería retornar la ruta recibida si es absoluta.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Void');

    expect(pathIsAbsolute(newPath)).toBe(newPath);
  });

  it('Debería convertir la ruta relativa a absoluta, devolviendo ésta última.', () => {
    const newPath = 'Markdown';

    expect(pathIsAbsolute(newPath)).toBe(pathConvertAbsolute(newPath));
  });
});


describe('Testing de función validateArchive', () => {
  it('validateArchive debería ser una función.', () => {
    expect(typeof validateArchive).toBe('function');
  });

  it('Si la ruta recibida corresponde a un archivo normal, validateArchive devuelve true.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'details.html');

    expect(validateArchive(newPath)).toBe(true);
  });

  it('Si la ruta recibida no corresponde a un archivo normal, validateArchive devuelve false.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Void');

    expect(validateArchive(newPath)).toBe(false);
  });
});


describe('Testing de función validateDirectory', () => {
  it('validateDirectory debería ser una función.', () => {
    expect(typeof validateDirectory).toBe('function');
  });

  it('Si la ruta recibida corresponde a un directorio, validateDirectory devuelve true.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Void');

    expect(validateDirectory(newPath)).toBe(true);
  });

  it('Si la ruta recibida no corresponde a un directorio, validateDirectory devuelve false.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'details.html');

    expect(validateDirectory(newPath)).toBe(false);
  });
});


describe('Testing de función validateTypeArchive', () => {
  it('validateTypeArchive debería ser una función.', () => {
    expect(typeof validateTypeArchive).toBe('function');
  });

  it('Si la ruta recibida corresponde a un archivo, validateTypeArchive devolverá la extensión del mismo.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'details.html');

    expect(validateTypeArchive(newPath)).toBe('.html');
  });

  it('Si la ruta recibida no corresponde a un archivo, validateTypeArchive devolverá un string vacío.', () => {
    const newPath = path.join(process.cwd(), 'MarkdownForTest', 'Void');

    expect(validateTypeArchive(newPath)).toBe('');
  });
});
