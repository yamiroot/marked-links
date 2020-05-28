#!/usr/bin/env node

const colors = require('colors');


// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
// args: Parámetro.
const [, , ...args] = process.argv;

const { cli } = require('./cli');


/* eslint-disable no-console */


try {
  cli(args).then((response) => {
    if ((typeof response) === 'string') {
      console.log(response);
    } else if ((typeof response === 'object') && (response.length > 0)) {
      if (args.length === 1) {
        response.forEach((element) => {
          console.log((element.file).white, ' ', (element.text).magenta.bold);
        });
      }

      if (args[1] === '--validate' && args.length === 2) {
        response.forEach((element) => {
          console.log((element.file).white, ' ', (element.statusText).cyan, ' ', colors.yellow(element.status), ' ', (element.text).magenta.bold);
        });
      }

      if (args[1] === '--stats' && args.length === 2) {
        const uniquesTotal = new Set(response);

        console.log('Total: '.blue.bold, colors.white.bold(response.length));
        console.log('Uniques: '.magenta.bold, colors.white.bold(uniquesTotal.size));
      }

      if (((args[1] === '--validate' && args[2] === '--stats') || (args[1] === '--stats' && args[2] === '--validate')) && (args.length === 3)) {
        const uniquesTotal = new Set(response);
        let contador = 0;

        response.forEach((element) => {
          if (element.statusText === 'fail') {
            contador += 1;
          }
        });

        console.log('Total: '.blue.bold, colors.white.bold(response.length));
        console.log('Uniques: '.magenta.bold, colors.white.bold(uniquesTotal.size));
        console.log('Broken: '.white.bold, colors.white.bold(contador));
      }
    }
  }).catch((error) => console.log(error));
} catch (error) {
  console.log(colors.red('Error inesperado. Asegúrese de ingresar una ruta válida.'), error);
}
