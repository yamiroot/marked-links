// const path = require('path');

const rootConvertAbsolute = (root) => {
  // Proceso de conversión....

  console.log(root);
};

const rootIsAbsolute = (root) => {
  if (root) {
    if (root === 'absoluta') {
      return root;
    }
    return rootConvertAbsolute(root);
  }
  return root;
};


const validateArchiveDirectory = (root) => {
  console.log(root);
};


const validateTypeArchive = (root) => {
  console.log(root);
};


module.exports = {
  rootConvertAbsolute,
  rootIsAbsolute,
  validateArchiveDirectory,
  validateTypeArchive,
};
