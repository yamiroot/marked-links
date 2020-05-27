const myFunctions = require('./main.js');

const {
  validateMarkdownsDirectory, validateArchive, isPathExists,
  linksOfArchivesMarkdown, validateLinksStatus, validateMarkdownsArchive,
} = myFunctions;


const validateLinks = (pathValidated, opts) => {
  if (validateArchive(pathValidated)) {
    const arrayArchivesMarkdown = validateMarkdownsArchive(pathValidated);
    const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

    if ((opts[0] !== undefined) && opts[0].validate && arrayLinksOfMarkdown.length !== 0) {
      return validateLinksStatus(arrayLinksOfMarkdown);
    }

    return (arrayLinksOfMarkdown.length === 0) ? Promise.resolve('La ruta ingresada corresponde a un archivo que no es markdown.') : Promise.resolve(arrayLinksOfMarkdown);
  }

  const arrayArchivesMarkdown = validateMarkdownsDirectory(pathValidated);
  const arrayLinksOfMarkdown = linksOfArchivesMarkdown(arrayArchivesMarkdown);

  if ((opts[0] !== undefined) && opts[0].validate && arrayLinksOfMarkdown.length !== 0) {
    return validateLinksStatus(arrayLinksOfMarkdown);
  }

  return (arrayLinksOfMarkdown.length === 0) ? Promise.resolve('La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown.') : Promise.resolve(arrayLinksOfMarkdown);
};


const mdLinks = (newPath, ...opts) => {
  const pathValidated = myFunctions.pathIsAbsolute(newPath);

  if (isPathExists(newPath)) {
    if (opts.length === 1 || opts.length === 0) {
      switch ((typeof opts[0])) {
        case 'string':
          return Promise.resolve('El segundo argumento es de tipo string y corresponde a un tipo inválido.');
        case 'number':
          return Promise.resolve('El segundo argumento es de tipo number y corresponde a un tipo inválido.');
        case 'function':
          return Promise.resolve('El segundo argumento es de tipo function y corresponde a un tipo inválido.');
        case 'boolean':
          return Promise.resolve('El segundo argumento es de tipo boolean y corresponde a un tipo inválido.');
        case 'symbol':
          return Promise.resolve('El segundo argumento es de tipo symbol y corresponde a un tipo inválido.');
        case 'object': {
          // Null
          if (opts[0] === null) {
            return Promise.resolve('El segundo argumento corresponde a null y es de tipo inválido.');
          }

          // Array
          if (Array.isArray(opts[0])) {
            return Promise.resolve('El segundo argumento corresponde a un array y es de tipo inválido.');
          }

          // Objeto vacío
          if (Object.keys(opts[0]).length === 0) {
            return Promise.resolve('El segundo argumento es de tipo object y se encuentra vacío.');
          }

          // Objeto con una o más propiedades
          if (Object.keys(opts[0]).length > 1) {
            return Promise.resolve('El segundo argumento es de tipo object y contiene más de una propiedad.');
          }

          // Objeto con una propiedad; ésta última no es validate
          if (Object.keys(opts[0]).length === 1 && Object.keys(opts[0])[0] !== 'validate') {
            return Promise.resolve('El segundo argumento es de tipo object y contiene una propiedad que no es validate.');
          }

          // Objeto con una propiedad cuyo key es validate, pero su valor no es de tipo booleano
          if (Object.keys(opts[0]).length === 1 && Object.keys(opts[0])[0] === 'validate' && typeof opts[0].validate !== 'boolean') {
            return Promise.resolve('El segundo argumento es de tipo object y contiene la propiedad validate pero su valor no es de tipo boolean.');
          }

          return validateLinks(pathValidated, opts);
        }
        default:
          // undefined / No recibe argumento
          return validateLinks(pathValidated, opts);
      }
    }

    return Promise.reject(new Error('La función mdLinks no puede recibir más de dos argumentos.'));
  }

  return Promise.reject(new Error('La ruta ingresada no existe.'));
};


module.exports = mdLinks;
