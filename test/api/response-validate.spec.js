const path = require('path');
const process = require('process');


const responseValidate = require('../../lib/api/response-validate');


const informationLinkArchive = [{
  href: 'https://dzone.com/articles/huwork',
  text: 'SPA',
  file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
}];


const informationLinkStatusArchive = [{
  href: 'https://dzone.com/articles/huwork',
  text: 'SPA',
  file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
  status: 404,
  statusText: 'fail',
}];


const informationLinksDirectory = [{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
  text: 'import',
  file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
}, {
  href: 'aabbcc123',
  text: 'export',
  file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
}];


const informationLinksStatusDirectory = [{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
  text: 'import',
  file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
  status: 200,
  statusText: 'ok',
}, {
  href: 'aabbcc123',
  text: 'export',
  file: path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown', 'readme.md'),
  status: 'ocurrió un error',
  statusText: 'fail',
}];


describe('Testing de función responseValidate', () => {
  it('responseValidate debería ser una función.', () => {
    expect(typeof responseValidate).toBe('function');
  });

  // Path of archive

  it('Debería retornar "La ruta ingresada corresponde a un archivo que no es markdown." al recibir como argumento una ruta válida de un archivo que no es markdown.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'details.html')).then((response) => {
      expect(response).toStrictEqual('La ruta ingresada corresponde a un archivo que no es markdown.');
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumentos una ruta válida de un archivo y undefined.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), undefined).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumentos una ruta válida de un archivo y un objeto con un key "validate" cuyo valor es false.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumentos una ruta válida de un archivo y un objeto con un key "validate" cuyo valor es true.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), { validate: true }).then((response) => {
      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  // Path of directory

  it('Debería retornar "La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown." al recibir como argumento una ruta válida de un directorio vacío.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'Void')).then((response) => {
      expect(response).toStrictEqual('La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown.');
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumentos una ruta válida de un directorio y undefined.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown'), undefined).then((response) => {
      expect(response).toStrictEqual(informationLinksDirectory);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumentos una ruta válida de un directorio y un objeto con un key "validate" cuyo valor es false.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(informationLinksDirectory);
      done();
    }));


  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumentos una ruta válida de un directorio y un objeto con un key "validate" cuyo valor es true.',
    (done) => responseValidate(path.join(process.cwd(), 'MarkdownForTest', 'TestMarkdown'), { validate: true }).then((response) => {
      expect(response).toStrictEqual(informationLinksStatusDirectory);
      done();
    }));
});
