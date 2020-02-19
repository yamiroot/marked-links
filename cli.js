#!/usr/bin/env node

// process.argv: Es una matriz que contiene los argumentos de la línea de comandos.
// args: Parámetro.
const [,, ...args] = process.argv;

console.log(args);
