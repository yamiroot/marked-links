#!/usr/bin/env node

const { mdLinks } = require('./src/index.js');

// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
// args: Parámetro.
const [,, ...args] = process.argv;

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

cli(args).then((response) => {
  if ((typeof response) === 'string') {
    console.log(response);
  }

  if (args[1] === '--validate' && args.length === 2) {
    response.forEach((element) => {
      console.log(element.file, ' ', element.statusText, ' ', element.status, ' ', element.text);
    });
  }

  if (args[1] === '--stats' && args.length === 2) {
    const uniquesTotal = new Set(response);

    console.log('Total: ', response.length);
    console.log('Uniques: ', uniquesTotal.size);
  }

  if (((args[1] === '--validate' && args[2] === '--stats') || (args[1] === '--stats' && args[2] === '--validate')) && (args.length === 3)) {
    const uniquesTotal = new Set(response);
    let contador = 0;

    response.forEach((element) => {
      if (element.statusText === 'fail') {
        contador += 1;
      }
    });

    console.log('Total: ', response.length);
    console.log('Uniques: ', uniquesTotal.size);
    console.log('Broken: ', contador);
  }
}).catch((error) => {
  console.log(error);
});
