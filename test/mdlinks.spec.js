const path = require('path');
const fs = require('fs');

const {
  rootConvertAbsolute, rootIsAbsolute, validateArchiveDirectory, validateTypeArchive,
} = require('../src/index.js');

describe('Valido el tipo de ruta recibido.', () => {
  it('Debería ser una función.', () => {
    expect(typeof rootIsAbsolute).toBe('function');
  });

  /* it('La ruta debería ser un String.', () => {
        const root = 'newruta';
        expect(path.isAbsolute()).toBe('String');
    }); */

  it('Debería detectar si la ruta recibida es absoluta.', () => {
    const root = '/md/newruta.js';
    expect(path.isAbsolute(rootIsAbsolute(root))).toBe(true);
  });

  it('Debería detectar si la ruta recibida es relativa.', () => {
    const root = '/md/newruta';
    expect(path.isAbsolute(rootIsAbsolute(root))).toBe(false);
  });
});


describe('Convertir ruta relativa a absoluta.', () => {
  it('Debería ser una función.', () => {
    expect(typeof rootConvertAbsolute).toBe('function');
  });

  it('Si la ruta recibida es relativa debería convertir a absoluta.', () => {
    const root = 'newruta';
    expect(path.isAbsolute(rootConvertAbsolute(root))).toBe(true);
  });
});


describe('Valido si recibo un archivo o directorio.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateArchiveDirectory).toBe('function');
  });

  it('Debería detectar si es un archivo.', () => {
    const root = '/md/archive.md';
    expect(fs.stats.isFile(validateArchiveDirectory(root))).toBe(true);
  });

  it('Debería detectar si es un directorio.', () => {
    const root = '/md/directory';
    expect(fs.stats.isDirectory(validateArchiveDirectory(root))).toBe(true);
  });
});


describe('Valido el tipo de archivo recibido.', () => {
  it('Debería ser una función.', () => {
    expect(typeof validateTypeArchive).toBe('function');
  });

  it('Debería detectar si es un archivo md.', () => {
    const root = '/md/archive.md';
    expect(path.parse(root).ext).toBe('.md');
  });

  it('Debería detectar si es un archivo diferente al formato md.', () => {
    const root = '/md/directory/index.html';
    expect(path.parse(root).ext).toBe('.md');
  });
});
