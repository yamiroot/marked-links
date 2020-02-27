const colors = require('colors');
const { mdLinks } = require('./index.js');
const { isPathExists } = require('./main');


const cli = (array) => {
  // array[0]: Ruta.

  if (array.length === 0) {
    return Promise.resolve(colors.america('Por favor, ingrese una ruta.'));
  }

  if (array.length > 3) {
    return Promise.resolve(colors.dim('Ha excedido el número de comandos permitidos.'));
  }

  if (isPathExists(array[0])) {
    if (array.length === 1) {
      return Promise.resolve(colors.bold('Por favor, ingrese un comando.'));
    }
    if (array[1] === '--stats' && array.length === 2) {
      return mdLinks(array[0], { validate: false });
    } if (array[1] === '--validate' && array.length === 2) {
      return mdLinks(array[0], { validate: true });
    } if ((array[1] === '--validate' && array[2] === '--stats') || (array[1] === '--stats' && array[2] === '--validate')) {
      return mdLinks(array[0], { validate: true });
    }

    return Promise.resolve(colors.rainbow('El comando ingresado no es válido.'));
  }

  return Promise.reject(new Error(colors.cyan('La ruta ingresada NO existe')));
};


module.exports = { cli };
