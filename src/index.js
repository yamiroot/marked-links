const path = require('path');
const fs = require('fs');


// path.resolve(root): Devuelve un String.
const pathConvertAbsolute = (newPath) => path.resolve(newPath);


const pathIsAbsolute = (newPath) => {
  // path.isAbsolute(root): Retorna un booleano.

  if (path.isAbsolute(newPath)) {
    return newPath;
  }

  return pathConvertAbsolute(newPath);
};


// path.parse(path): Retorna un objeto.
// path.extname(path): Devuelve la extensión de la ruta. (String)
const validateTypeArchive = (newPath) => path.extname(newPath);


// fs.stats.isFile(): Devuelve un booleano.
const validateArchive = (newPath) => fs.stats.isFile(newPath);


// fs.stats.isDirectory(): Devuelve un booleano.
const validateDirectory = (newPath) => fs.stats.isDirectory(newPath);


const validateLinks = (newPath) => {
  const array = [];
/*   if (reply) {

  } */
};


const mdLinks = (newPath, opts) => {
  if ((typeof newPath) === 'string') {
    const pathValidated = pathIsAbsolute(newPath);

    if (validateArchive(pathValidated)) {
      if (validateTypeArchive(pathValidated) === '.md') {
        if (opts.validate) {
          return validateLinks(pathValidated);
        }

        return validateLinks(pathValidated);
      }
      // return console.log('El archivo recibido no es de formato ".md".');
    } else if (validateDirectory(pathValidated)) {
      // ...
    }
  }

  return console.log('El dato ingresado no es String.');
};

mdLinks('archivo.md');


module.exports = {
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateTypeArchive,
};

// 200 - 359 - ok;

// status: numero
// ok: ok / fail
