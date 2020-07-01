const fs = require('fs');
const path = require('path');

function createDefaultSrvService() {
  try {
    const srvDirectory = path.normalize(this.scriptPath + '/srv/');

    const bookService = 'book-service.cds';
    const catService = 'cat-service.js';

    const defaultBookService = fs.readFileSync(
      srvDirectory + bookService,
      'utf8'
    );
    const defaultCatService = fs.readFileSync(
      srvDirectory + catService,
      'utf8'
    );

    const newDirectory = path.normalize(this.targetPath + '/srv/');
    fs.writeFileSync(newDirectory + bookService, defaultBookService);
    fs.writeFileSync(newDirectory + catService, defaultCatService);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createDefaultSrvService;
