
const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock
  .mock('https://dzone.com/articles/how-single-page-web-applications-actually-work', 200)
  .mock('https://darwindigital.com/mobile-first-versus-responsive-web-design/', 200)
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import', 200)
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export', 200)
  .mock('https://dzone.com/articlpplications-actually-work', 404);


module.exports = fetchMock;
