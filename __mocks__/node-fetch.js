
// __mocks__: Directorio que permite definir simulaciones (mocks) manuales.

// Mock manuales: Se utilizan para eliminar la funcionalidad con datos simulados.
// Por ejemplo, en lugar de acceder a un recurso remoto como un sitio web o una
// base de datos, es posible que desee crear un simulacro manual que le permita
// utilizar datos falsos.


// jest.requireActual(moduleName): Devuelve el módulo real en lugar de un simulacro.
const nodeFetch = jest.requireActual('node-fetch');


// fetch-mock: Permite burlarse de las solicitudes http realizadas utilizando
// fetch o una biblioteca que imita su api, como node-fetch o fetch-ponyfill.
// sandbox(): Devuelve una función que se puede usar como reemplazo directo de
// fetch.
const fetchMock = require('fetch-mock').sandbox();


// Object.assign(): Copia todas las propiedades enumerables de uno o más objetos
// fuente a un objeto destino. Devuelve el objeto destino.
// Sintaxis: Object.assign(objetivo, ...fuentes)
// Parámetros:
// - objetivo: El objeto destino.
// - fuentes: Los objetos origen.

// fetch-mock permite la configuración de sus opciones directamente con la
// propiedad "config".
Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});


// fetchMock.mock(matcher, response): Permite realizar el simulacro de solicitud http.
// Parámetros:
// - matcher : Es una URL exacta o expresión regular.
// - response: Es un código de estado, cadena u objeto literal.

fetchMock
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import', 200)
  .mock('https://dzone.com/articles/huwork', 404)
  .mock('aabbcc123', {
    throws: new Error('Failed to fetch'),
  });


module.exports = fetchMock;
