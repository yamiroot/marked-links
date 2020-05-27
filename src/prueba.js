const mdLinks = require('./index');


mdLinks('/home/administrador/Escritorio/JsProject/markdown-links/MarkdownForTests/29-ARIA.html', { validate: true }).then((data) => console.log(data)).catch((error) => console.log(error));
