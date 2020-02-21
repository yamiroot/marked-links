const path = require('path');

const {
  pathConvertAbsolute, pathIsAbsolute,
} = require('../src/main.js');


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
