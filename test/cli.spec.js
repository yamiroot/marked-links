const path = require('path');
const colors = require('colors');

const { cli } = require('../src/functionCli.js');
const { mdLinks } = require('../src/index');


describe('Cli', () => {
  const arrayReturn = [{
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    href: 'https://dzone.com/articles/huwork',
    text: 'SPA',
  }];

  const arrayReturnStatus = [{
    file: path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'),
    href: 'https://dzone.com/articles/huwork',
    text: 'SPA',
    status: 404,
    statusText: 'fail',
  }];

  it('Debería ser una función.', () => {
    expect(typeof cli).toBe('function');
  });

  it('Debería retornar una promesa cuyo valor resuelto es: "Por favor, ingrese una ruta."',
    (done) => cli([]).then((response) => {
      expect(response).toBe(colors.america('Por favor, ingrese una ruta.'));
      done();
    }));

  it('Debería retornar una promesa cuyo valor resuelto es: "Ha excedido el número de comandos permitidos."',
    (done) => cli([1, 2, 3, 4]).then((response) => {
      expect(response).toBe(colors.dim('Ha excedido el número de comandos permitidos.'));
      done();
    }));


  it('Debería retornar una promesa cuyo valor resuelto es: "Por favor, ingrese un comando."',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md')]).then((response) => {
      expect(response).toBe(colors.bold('Por favor, ingrese un comando.'));
      done();
    }));


  it('Pasamos como parámetro la ruta y "--stats". Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, y file.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: false }).then((response) => {
      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--stats']).then(() => {
        expect(response).toStrictEqual(arrayReturn);
      });
      done();
    }));


  it('Pasamos como parámetro la ruta y "--validate". Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--validate']).then(() => {
        expect(response).toStrictEqual(arrayReturnStatus);
      });

      done();
    }));

  it('Pasamos como parámetro la ruta, "--validate" y "--stats" (En ese orden). Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--validate', '--stats']).then(() => {
        expect(response).toStrictEqual(arrayReturnStatus);
      });

      done();
    }));


  it('Pasamos como parámetro la ruta, "--stats" y "--validate" (En ese orden). Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--stats', '--validate']).then(() => {
        expect(response).toStrictEqual(arrayReturnStatus);
      });

      done();
    }));

  it('Debería retornar una promesa cuyo valor resuelto es: "El comando ingresado no es válido."',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), 'comando-invalido']).then((response) => {
      expect(response).toBe(colors.rainbow('El comando ingresado no es válido.'));
      done();
    }));


  it('Debería retornar una promesa fallida cuyo valor resuelto es: "La ruta ingresada no existe"',
    (done) => cli(['ruta-invalida']).catch((response) => {
      expect(response).toStrictEqual(new Error(colors.cyan('La ruta ingresada no existe')));
      done();
    }));
});
