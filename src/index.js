const path = require('path');
const fs = require('fs');
const url = require('url');


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


const validateMarkdowns = (newPath) => {
  // fs.readdirSync (ruta, opciones): Lee la ruta y devuelve una array de Strings(rutas).
  const arrayPaths = fs.readdirSync(newPath, 'utf-8');
  let arrayOfLinksMarkdown = [];

  arrayPaths.forEach((file) => {
    // path.join([...paths]): Retorna un String.
    const pathName = path.join(newPath, file);

    if (validateDirectory(pathName)) {
      // Al llamar a la función recursiva, crea una nueva variable "arrayLinksMarkdown"
      // porque esta declarada con "let", y esta última solo puede ser usada en la función
      // origen, ya que respeta el alcance de la función. Por ende, no afecta al valor
      // acumulado.

      const array = validateMarkdowns(pathName);

      arrayOfLinksMarkdown = arrayOfLinksMarkdown.concat(array);
    }

    if (validateArchive(pathName)) {
      if (validateTypeArchive(pathName) === '.md') {
        arrayOfLinksMarkdown.push(pathName);
      }
    }
  });

  return arrayOfLinksMarkdown;
};

// console.log(validateMarkdowns('/home/administrador/Escritorio/JsProject/LIM011-fe-md-links'));


const informationMarkdowns = (arrayLinksMarkdown) => {
  const arrayInformation = [];

  arrayLinksMarkdown.forEach((link) => {
    arrayInformation.push({
      href: (new URL(link)).href,
      text: (new URL(link)).pathname,
    });
  });

  return arrayInformation;
};


const linksOfArchivesMarkdown = (arrayOfLinksMarkdown) => {
  return fs.readFileSync(arrayOfLinksMarkdown, null);
};

console.log('info', linksOfArchivesMarkdown('/home/administrador/Escritorio/HTML/7-abreviaturas.html'));


const mdLinks = (newPath, opts) => {
  if ((typeof newPath) === 'string') {
    const pathValidated = pathIsAbsolute(newPath);

    const arrayMarkdowns = validateMarkdowns(pathValidated);

    if (opts.validate) {
      // ...
    }
  }

  return console.log('El dato ingresado no es String.');
};


// mdLinks('/home/administrador/Escritorio/CSS');


module.exports = {
  pathConvertAbsolute,
  pathIsAbsolute,
  validateArchive,
  validateDirectory,
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
