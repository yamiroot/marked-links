#!/usr/bin/env node


// Los scripts que deben ser ejecutados por un intérprete normalmente tienen una línea
// de Shebang en la parte superior para indicar al sistema operativo cómo ejecutarlos.
// Shebang: Es el nombre que recibe el par de caracteres #! que se encuentran al inicio
// de los programas ejecutables interpretados. A continuación de estos caracteres se
// indica la ruta completa al intérprete de las órdenes.
// Cuando no se conoce la ruta absoluta del mismo, es posible utilizar el programa
// auxiliar 'env', que generalmente suele estar en /usr/bin.

// - /: Raíz o root de todo el sistema de archivos Unix.
// - /usr: Este es uno de los directorios más importantes del sistema puesto que contiene
// los programas de uso común para todos los usuarios.
// - /usr/bin Programas de uso general, lo que incluye el compilador de C/C++.
// En nuestro caso nuestro script será ejecutado por node (#!/usr/bin/env node).
// - env: Cuya función principal es ejecutar otro comando con un entorno modificado, agregando
// o eliminando variables de entorno especificadas antes de ejecutar el comando.


/* eslint-disable no-console */


// colors: Módulo que permite dar color y estilo a tu consola de node.js.
const colors = require('colors');


// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
//  El primer elemento será node , el segundo elemento será el nombre del archivo
// JavaScript. Los siguientes elementos serán los argumentos de línea de comando
// adicionales.

// args: Parámetros.
const [, , ...args] = process.argv;


const { cli } = require('./cli');


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
        // Set: Objeto que permite almacenar valores únicos de cualquier tipo, incluso
        // valores primitivos y referencias a objetos.
        // Sintaxis: new Set(iterable);
        // Parámetros
        // - iterable: Si un objeto iterable es pasado, todos sus elementos serán añadidos
        // al nuevo Set. Si no se especifica este parámetro, o si su valor es null, el nuevo
        // Set estará vacío.
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
