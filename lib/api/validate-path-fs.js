
// Módulos de node.js

// path: Proporciona utilidades para trabajar con rutas de archivos y directorios.
const path = require('path');
// fs: Proporciona una API para interactuar con el sistema de archivos.
const fs = require('fs');


// fs.existsSync(path): Método síncrono. Prueba si la ruta dada existe o no, verificando
// el sistema de archivos. Devuelve true si la ruta existe, false de lo contrario.
const isPathExists = (newPath) => fs.existsSync(newPath);


// path.resolve(path): Convierte una secuencia de rutas o segmentos de ruta en una
// ruta absoluta. Retorna dicha ruta como String.
const pathConvertAbsolute = (newPath) => path.resolve(newPath);


const pathIsAbsolute = (newPath) => {
  // path.isAbsolute(path): Determina si la ruta recibida es absoluta. Retorna un booleano.

  if (path.isAbsolute(newPath)) {
    return newPath;
  }

  return pathConvertAbsolute(newPath);
};


// path.extname(path): Devuelve la extensión de la ruta como String, desde la
// última aparición del carácter . (punto) hasta el final de la cadena. Si no
// hay ningún (.) en la última parte de la ruta, devolverá una cadena vacía.
const validateTypeArchive = (newPath) => path.extname(newPath);


// fs.statSync(path): Devuelve un objeto que proporciona información sobre un archivo.
// stats.isFile(): Devuelve true si el objeto fs.Stats describe un archivo normal.
const validateArchive = (newPath) => fs.statSync(newPath).isFile();


// fs.statSync(path): Devuelve un objeto que proporciona información sobre un archivo.
// stats.isDirectory(): Devuelve true si el objeto fs.Stats describe un directorio
// del sistema de archivos.
const validateDirectory = (newPath) => fs.statSync(newPath).isDirectory();


module.exports = {
  isPathExists,
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateDirectory,
  validateTypeArchive,
};
