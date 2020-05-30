
const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();


Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});


fetchMock
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import', 200)
  .mock('https://dzone.com/articles/huwork', 404)
  .mock('aabbcc123', {
    throws: new Error('Failed to fetch'),
  });


module.exports = fetchMock;
