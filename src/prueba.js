const mdLinks = require('./index');


mdLinks('/home/administrador/Escritorio/JsProject/markdown-links/MarkdownForTests/TestMarkdown', { validate: true }).then((data) => console.log(data)).catch((error) => console.log(error));
