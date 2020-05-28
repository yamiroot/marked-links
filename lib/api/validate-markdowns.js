
// Módulos de node.js

// path: Proporciona utilidades para trabajar con rutas de archivos y directorios.
const path = require('path');
// fs: Proporciona una API para interactuar con el sistema de archivos.
const fs = require('fs');


const functionsPathFs = require('./validate-path-fs');

const {
  validateTypeArchive, validateDirectory,
} = functionsPathFs;


const validateMarkdownsArchive = (newPath) => {
  const arrayOfLinksMarkdown = [];

  if (validateTypeArchive(newPath) === '.md') {
    arrayOfLinksMarkdown.push(newPath);
  }

  return arrayOfLinksMarkdown;
};


const validateMarkdownsDirectory = (newPath) => {
  // fs.readdirSync (ruta, opcion): Método síncrono que lee la ruta de un directorio y
  // devuelve un array de rutas de archivos.
  // Parámetros:
  // - path: Ruta del directorio.
  // - opcion: Especifica la codificación de caracteres que se utilizará para los
  // nombres de los archivo devueltos. 'utf-8' determina una codificación en String.
  const arrayPaths = fs.readdirSync(newPath, 'utf-8');

  let arrayOfLinksMarkdown = [];

  arrayPaths.forEach((file) => {
    // path.join([...paths]): Une todos los segmentos de rutas dados juntos usando el
    // separador específico de la plataforma como delimitador, luego normaliza la ruta
    // resultante. Retorna la ruta normalizada como String.
    const pathName = path.join(newPath, file);

    if (validateDirectory(pathName)) {
      // Al llamar a la función recursiva, crea una nueva variable "arrayLinksMarkdown"
      // porque esta declarada con "let", y esta última solo puede ser usada en la función
      // origen, ya que respeta el alcance de la función. Por ende, no afecta al valor
      // acumulado.

      const array = validateMarkdownsDirectory(pathName);

      arrayOfLinksMarkdown = arrayOfLinksMarkdown.concat(array);
    }

    const arrayArchivesMarkdown = validateMarkdownsArchive(pathName);

    arrayArchivesMarkdown.forEach((markdown) => {
      arrayOfLinksMarkdown.push(markdown);
    });
  });

  return arrayOfLinksMarkdown;
};


module.exports = {
  validateMarkdownsArchive,
  validateMarkdownsDirectory,
};
