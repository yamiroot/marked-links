#!/usr/bin/env node

const { mdLinks } = require('./src/index.js');

// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
// args: Parámetro.
const [,, ...args] = process.argv;

const cli = (array) => {
  if (array.length > 3) {
    return Promise.resolve('Ha excedido el número de comandos permitidos.');
  }

  if (array[1] === '--stats') {
    return mdLinks(array[0], { validate: true });
  } if (args[1] === '--validate') {
    return mdLinks(array[0], { validate: false });
  } if ((args[1] === '--validate' && args[2] === '--stats') || (args[1] === '--stats' && args[2] === '--validate')) {
    return mdLinks(array[0], { validate: true });
  }

  return Promise.resolve('El comando ingresado no es válido.');
};

cli(args).then((response) => {
  console.log(response[0].file);
}).catch((error) => {
  console.log(error);
});
