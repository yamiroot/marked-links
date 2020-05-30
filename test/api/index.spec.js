
const path = require('path');


const mdLinks = require('../../lib/api/index');


describe('Testing de función mdLinks', () => {
  it('mdLinks debería ser una función.', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería retornar un mensaje "El segundo argumento es de tipo string y corresponde a un tipo inválido." al recibir como segundo argumento un string.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), '').then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo string y corresponde a un tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo number y corresponde a un tipo inválido." al recibir como segundo argumento un número.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), 5).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo number y corresponde a un tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo function y corresponde a un tipo inválido." al recibir como segundo argumento un valor de tipo function.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), class { }).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo function y corresponde a un tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo boolean y corresponde a un tipo inválido." al recibir como segundo argumento un valor booleano.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), true).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo boolean y corresponde a un tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo symbol y corresponde a un tipo inválido." al recibir como segundo argumento un valor de tipo symbol.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), Symbol('Hello word')).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo symbol y corresponde a un tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento corresponde a null y es de tipo inválido." al recibir como segundo argumento a null.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), null).then((response) => {
      expect(response).toStrictEqual('El segundo argumento corresponde a null y es de tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento corresponde a un array y es de tipo inválido." al recibir como segundo argumento un array.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), []).then((response) => {
      expect(response).toStrictEqual('El segundo argumento corresponde a un array y es de tipo inválido.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo object y se encuentra vacío." al recibir como segundo argumento un objeto vacío.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), {}).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo object y se encuentra vacío.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo object y contiene más de una propiedad." al recibir como segundo argumento un objeto con más de una propiedad.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), { a: 'a', b: 'b' }).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo object y contiene más de una propiedad.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo object y contiene una propiedad que no es validate." al recibir como segundo argumento un objeto con una propiedad que no es "validate".',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), { a: 'a' }).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo object y contiene una propiedad que no es validate.');
      done();
    }));

  it('Debería retornar un mensaje "El segundo argumento es de tipo object y contiene la propiedad validate pero su valor no es de tipo boolean." al recibir como segundo argumento un objeto con una propiedad "validate" cuyo valor no es booleano.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), { validate: 'a' }).then((response) => {
      expect(response).toStrictEqual('El segundo argumento es de tipo object y contiene la propiedad validate pero su valor no es de tipo boolean.');
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumentos una ruta válida de un archivo y un objeto con un key "validate" cuyo valor es true.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), { validate: true }).then((response) => {
      const informationLinkStatusArchive = [{
        href: 'https://dzone.com/articles/huwork',
        text: 'SPA',
        file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
        status: 404,
        statusText: 'fail',
      }];

      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumento una ruta válida de un archivo.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Readme.md')).then((response) => {
      const informationLinkArchive = [{
        href: 'https://dzone.com/articles/huwork',
        text: 'SPA',
        file: path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'),
      }];

      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Debería retornar un error con el mensaje "La función mdLinks no puede recibir más de dos argumentos." al recibir más de dos argumentos.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'Void'), {}, true).catch((response) => {
      expect(response).toStrictEqual(new Error('La función mdLinks no puede recibir más de dos argumentos.'));
      done();
    }));

  it('Debería retornar un error con el mensaje "La ruta ingresada no existe." al recibir como argumento una ruta inválida.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTest', 'NoExists')).catch((response) => {
      expect(response).toStrictEqual(new Error('La ruta ingresada no existe.'));
      done();
    }));
});
