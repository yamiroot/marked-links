#!/usr/bin/env node

/* eslint-disable no-console */

// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
// args: Parámetro.
const [,, ...args] = process.argv;

const { cli } = require('./functionCli');

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
