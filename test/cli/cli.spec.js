const path = require('path');
const colors = require('colors');


const { cli } = require('../../lib/cli/cli');


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


describe('Testing de función cli', () => {
  it('cli debería ser una función.', () => {
    expect(typeof cli).toBe('function');
  });

  it('Debería retornar un mensaje "Por favor, ingrese una ruta." al recibir como segundo argumento un array vacío.',
    (done) => cli([]).then((response) => {
      expect(response).toBe(colors.yellow('Por favor, ingrese una ruta.'));
      done();
    }));

  it('Debería retornar un mensaje "Ha excedido el número de comandos permitidos." al recibir como argumento un array de más de tres elementos.',
    (done) => cli([1, 2, 3, 4]).then((response) => {
      expect(response).toBe(colors.dim('Ha excedido el número de comandos permitidos.'));
      done();
    }));


  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumento un array cuyo único elemento es la ruta válida de un archivo.',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md')]).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text y file, al recibir como argumento un array cuyos elementos son la ruta válida de un archivo y "--stats".',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), '--stats']).then((response) => {
      expect(response).toStrictEqual(informationLinkArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumento un array cuyos elementos son la ruta válida de un archivo y "--validate".',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), '--validate']).then((response) => {
      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumento un array cuyos elementos son la ruta válida de un archivo, "--validate" y "--stats".',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), '--validate', '--stats']).then((response) => {
      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  it('Debería retornar un array de objetos con las propiedades: href, text, file, status y statusText, al recibir como argumento un array cuyos elementos son la ruta válida de un archivo, "--stats" y "--validate".',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), '--stats', '--validate']).then((response) => {
      expect(response).toStrictEqual(informationLinkStatusArchive);
      done();
    }));

  it('Debería retornar un mensaje "El comando ingresado no es válido." al recibir como argumento un array cuyos elementos son la ruta válida de un archivo y un comando inválido.',
    (done) => cli([path.join(process.cwd(), 'MarkdownForTest', 'Readme.md'), 'root']).then((response) => {
      expect(response).toStrictEqual(colors.cyan('El comando ingresado no es válido.'));
      done();
    }));

  it('Debería retornar un mensaje de error "La ruta ingresada no existe." al recibir como argumento un array cuyo elemento es una ruta inválida.',
    (done) => cli(['ruta-invalida']).catch((response) => {
      expect(response).toStrictEqual(new Error(colors.magenta('La ruta ingresada no existe.')));
      done();
    }));
});
