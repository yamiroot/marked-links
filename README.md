<p align="center"><a href="src/assets/logo.png"><img src="src/assets/logo.png" width=80px></a></p>
<h1 align="center">Marked Links</h1>
<p align="center">
<img src="https://img.shields.io/badge/build-passing-brightgreen">
<img src="https://img.shields.io/badge/npm-v6.14.5-important">
<img src="https://img.shields.io/badge/license-MIT-9cf">
<img src="https://img.shields.io/badge/code--size-25.9kB-blueviolet">
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen">
</p>


## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero. Es usado en muchísimas plataformas que manejan texto plano (GitHub, 
foros, blogs, ...), y es muy común encontrar varios archivos en ese formato 
en cualquier tipo de repositorio (empezando por el tradicional `README.md`).


## El problema

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.


## La solución

`Marked-Links` es una librería que lee y analiza archivos en formato `Markdown`,
para verificar los links que contengan y reportar algunas estadísticas.

<p align="center"><a href="src/assets/marked-links.png"><img src="src/assets/marked-links.png"></a><p>


## Consideraciones generales

- `Marked-Links` se ejecuta con `Node.js` lo que nos permite ejecutar JavaScript en el 
entorno del sistema operativo ya sea en tu máquina o un servidor, y así poder interactuar 
con el sistema de archivos, entorno, redes, etc.

- El _parseado_ (análisis) del markdown para extraer los links se realiza mediante una 
combinación de _módulos_; primero, transformamos el markdown a `HTML` usando
[marked](https://github.com/markedjs/marked) y de ahí extraemos los links con una librería 
de `DOM`, en este caso [JSDOM](https://github.com/jsdom/jsdom).

- La librería incluye un _ejecutable_ que podemos invocar en la línea de comando y una
interfaz que podemos importar con `require` para usarlo programáticamente.

- El módulo es instalable desde el registro público de `NPM` y, también, desde `Github` ya 
que el repositorio es público y contiene un `package.json` válido.


## Algoritmo empleado

El diagrama de flujo fue elaborado con el programa [Dia](https://es.wikipedia.org/wiki/Dia_(programa)).

<a href="src/utils/df.png"><img src="src/utils/df.png"></a>


## Instalación

- Desde `NPM`:

```
$ npm install marked-links
```

- Desde `Github`: 

```
$ npm install yamiroot/marked-links
```


## Guía de uso

### Como módulo:

#### API `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa, debe resolverse como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve un arreglo (`Array`) de 
objetos (`Object`), donde cada objeto representa un link y contiene las siguientes
propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### Como ejecutable:

#### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable se ejecuta de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden `ok` o `fail`,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el mismo e imprimir los links que vaya encontrando, junto 
con la ruta del archivo donde aparece y el texto dentro del link.

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo realiza una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Sobre la librería:

- Implementada en `JavaScript`.
- Se ejecuta utilizando `Node.js`. 
- Dependencias: `marked`, `node-fetch`, `jsdom` y `colors`.
- Linter: `Eslint`.
- Otras tecnologías: `Jest`.
- Las pruebas unitarias cubren el 100% de `coverage`.


## Recursos

- [Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?](http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)
- [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
- [Promise](https://javascript.info/promise-basics)
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Destructuring](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f)
- [Comprendiendo Promesas en Js](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)
- [usr/bin/env node](https://www.it-swarm.dev/es/node.js/que-hace-exactamente-usrbinenv-node-al-principio-de-los-archivos-de-nodo/1056706740/)
- [Shebang](https://es.wikipedia.org/wiki/Shebang)
- [Herencia del Unix](http://www.juntadeandalucia.es/empleo/recursos/material_didactico/especialidades/materialdidactico_tic_linux_basico/tema_004/archivos/apartado_002.html)
- [package.json](http://wiki.commonjs.org/wiki/Packages/1.0)
- [Publicar primer módulo - video](https://www.youtube.com/watch?v=grOjfJpqwyw&start=12s)


## Licencia

Copyleft 🄯 2020, Licencia MIT.

