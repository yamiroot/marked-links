const path = require('path');

const { cli } = require('../src/functionCli.js');
const { mdLinks } = require('../src/index');


describe('Cli', () => {
  it('Debería ser una función.', () => {
    expect(typeof cli).toBe('function');
  });

  it('Debería retornar una promesa cuyo valor resuelto es: "Por favor, ingrese una ruta."',
    (done) => cli([]).then((response) => {
      expect(response).toBe('Por favor, ingrese una ruta.');
      done();
    }));

  it('Debería retornar una promesa cuyo valor resuelto es: "Ha excedido el número de comandos permitidos."',
    (done) => cli([1, 2, 3, 4]).then((response) => {
      expect(response).toBe('Ha excedido el número de comandos permitidos.');
      done();
    }));

  it('Pasamos como parámetro la ruta y "--stats". Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, y file.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: false }).then((response) => {
      const arrayReturn = [{
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
      }, {
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
      }];

      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--stats']).then(() => {
        expect(response).toStrictEqual(arrayReturn);
      });
      done();
    }));


  it('Pasamos como parámetro la ruta y "--validate". Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      const arrayReturn = [{
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        status: 200,
        statusText: 'ok',
      }, {
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
        status: 200,
        statusText: 'ok',
      }];

      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--validate']).then(() => {
        expect(response).toStrictEqual(arrayReturn);
      });

      done();
    }));

  it('Pasamos como parámetro la ruta, "--validate" y "--stats" (En ese orden). Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      const arrayReturn = [{
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        status: 200,
        statusText: 'ok',
      }, {
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
        status: 200,
        statusText: 'ok',
      }];

      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--validate', '--stats']).then(() => {
        expect(response).toStrictEqual(arrayReturn);
      });

      done();
    }));


  it('Pasamos como parámetro la ruta, "--stats" y "--validate" (En ese orden). Por ello, debería retornar una promesa cuyo valor resuelto es un array de objetos con las propiedades href, text, file, status y statusText.',
    (done) => mdLinks(path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), { validate: true }).then((response) => {
      const arrayReturn = [{
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://dzone.com/articles/how-single-page-web-applications-actually-work',
        text: 'SPA',
        status: 200,
        statusText: 'ok',
      }, {
        file: '/home/administrador/Escritorio/JsProject/LIM011-fe-md-links/MarkdownForTests/Readme.md',
        href: 'https://darwindigital.com/mobile-first-versus-responsive-web-design/',
        text: 'mobile first',
        status: 200,
        statusText: 'ok',
      }];

      cli([path.join(process.cwd(), 'MarkdownForTests', 'Readme.md'), '--stats', '--validate']).then(() => {
        expect(response).toStrictEqual(arrayReturn);
      });

      done();
    }));

  it('Debería retornar una promesa cuyo valor resuelto es: "El comando ingresado no es válido."',
    (done) => cli(['cadena-invalida']).then((response) => {
      expect(response).toBe('El comando ingresado no es válido.');
      done();
    }));
});
