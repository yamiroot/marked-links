/* eslint-disable no-console */

const colors = require('colors');


const mdLinks = require('../api/index');
const { isPathExists } = require('../api/validate-path-fs');


const cli = (array) => {
  // array[0]: Path.

  console.log('\n');
  console.log(colors.green('┏━┓┏━┓    ┏┓   ┏┓             ┏┓      ┏┓'));
  console.log(colors.green('┃┃┗┛┃┃    ┃┃   ┃┃             ┃┃      ┃┃'));
  console.log(colors.green('┃┏┓┏┓┣━━┳━┫┃┏┳━┛┣━━┳┓┏┓┏┳━┓   ┃┃  ┏┳━┓┃┃┏┳━━┓'));
  console.log(colors.green('┃┃┃┃┃┃┏┓┃┏┫┗┛┫┏┓┃┏┓┃┗┛┗┛┃┏┓┓  ┃┃ ┏╋┫┏┓┫┗┛┫━━┫'));
  console.log(colors.green('┃┃┃┃┃┃┏┓┃┃┃┏┓┫┗┛┃┗┛┣┓┏┓┏┫┃┃┃  ┃┗━┛┃┃┃┃┃┏┓╋━━┃'));
  console.log(colors.green('┗┛┗┛┗┻┛┗┻┛┗┛┗┻━━┻━━┛┗┛┗┛┗┛┗┛  ┗━━━┻┻┛┗┻┛┗┻━━┛'));
  console.log('\n');

  if (array.length === 0) {
    return Promise.resolve(colors.yellow('Por favor, ingrese una ruta.'));
  }

  if (array.length > 3) {
    return Promise.resolve(colors.dim('Ha excedido el número de comandos permitidos.'));
  }

  if (isPathExists(array[0])) {
    if (array.length === 1) {
      return mdLinks(array[0]);
    } if (array[1] === '--stats' && array.length === 2) {
      return mdLinks(array[0], { validate: false });
    } if (array[1] === '--validate' && array.length === 2) {
      return mdLinks(array[0], { validate: true });
    } if (((array[1] === '--validate' && array[2] === '--stats') || (array[1] === '--stats' && array[2] === '--validate')) && array.length === 3) {
      return mdLinks(array[0], { validate: true });
    }

    return Promise.resolve(colors.cyan('El comando ingresado no es válido.'));
  }

  return Promise.reject(new Error(colors.magenta('La ruta ingresada no existe')));
};


module.exports = { cli };
