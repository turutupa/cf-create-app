const fs = require('fs');

module.exports = function load(file) {
  return fs.readFileSync(file, 'utf8');
};
