const { mdLinks } = require('./index.js');


const cli = (array) => {
  // array[0]: Ruta.

  if (array.length === 0) {
    return Promise.resolve('Por favor, ingrese una ruta.');
  }

  if (array.length > 3) {
    return Promise.resolve('Ha excedido el número de comandos permitidos.');
  }

  if (array[1] === '--stats' && array.length === 2) {
    return mdLinks(array[0], { validate: false });
  } if (array[1] === '--validate' && array.length === 2) {
    return mdLinks(array[0], { validate: true });
  } if ((array[1] === '--validate' && array[2] === '--stats') || (array[1] === '--stats' && array[2] === '--validate')) {
    return mdLinks(array[0], { validate: true });
  }

  return Promise.resolve('El comando ingresado no es válido.');
};


module.exports = { cli };
