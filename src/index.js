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
const validateArchive = (newPath) => fs.statSync(newPath).isFile();
// console.log(validateArchive('src/index.js'));


// fs.stats.isDirectory(): Devuelve un booleano
const validateDirectory = (newPath) => fs.statSync(newPath).isDirectory();
// console.log(validateDirectory('src'));


const validateMarkdownsDirectory = (newPath) => {
  // fs.readdirSync (ruta, opciones): Lee la ruta y devuelve una array de Strings(rutas).
  const arrayPaths = fs.readdirSync(newPath, 'utf-8');
  let arrayLinksMarkdown = [];

  arrayPaths.forEach((file) => {
    // path.join([...paths]): Retorna un String.
    const pathName = path.join(newPath, file);

    if (validateDirectory(pathName)) {
      // Al llamar a la función recursiva, crea una nueva variable "arrayLinksMarkdown"
      // porque esta declarada con "let", y esta última solo puede ser usada en la función
      // origen, ya que respeta el alcance de la función. Por ende, no afecta al valor
      // acumulado.

      const array = validateMarkdownsDirectory(pathName);

      arrayLinksMarkdown = arrayLinksMarkdown.concat(array);
    }

    if (validateArchive(pathName)) {
      if (validateTypeArchive(pathName) === '.md') {
        // console.log('Rutas de md: ', pathName);
        arrayLinksMarkdown.push(pathName);
      }
    }
  });

  return arrayLinksMarkdown;
};

// 2 archivos y 1 carpeta(1 archivo md)
console.log(validateMarkdownsDirectory('/home/administrador/Escritorio/JsProject/LIM011-fe-md-links'));


const mdLinks = (newPath) => {
  if ((typeof newPath) === 'string') {
    const pathValidated = pathIsAbsolute(newPath);

    validateMarkdowns(pathValidated);
  }

  return console.log('El dato ingresado no es String.');
};


// mdLinks('/home/administrador/Escritorio/CSS');


module.exports = {
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateTypeArchive,
};

// 200 - 359 - ok;

// status: numero
// ok: ok / fail


// path.dirname(path)


/*

    href: URL encontrada. -> const myURL = new URL('https://example.org/foo');
console.log(myURL.href); -> Devuelve un string

    text: Texto que aparecía dentro del link (<a>).

    file: Ruta del archivo donde se encontró el link. -> const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname); -> Devuelve un string

*/

/*
const validateLinks = (newPath, validate) => {
  const array = [];

  if (validate) {
    array.push(newPath);
  }

  /* if (opts.validate) {
      return validateLinks(pathValidated);
    }

    return validateLinks(pathValidated); */
/*
  return array;
}; */
