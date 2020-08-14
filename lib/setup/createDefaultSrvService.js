const fs = require('fs');
const path = require('path');

function createDefaultSrvService() {
  try {
    const srvDirectory = path.normalize(this.scriptPath + '/srv/');

    const bookService = 'book-service.cds';
    const bookHandlers = 'book-service.js';

    const defaultBookService = fs.readFileSync(
      srvDirectory + bookService,
      'utf8'
    );
    const defaultBookHandlers = fs.readFileSync(
      srvDirectory + bookHandlers,
      'utf8'
    );

    const newDirectory = path.normalize(this.targetPath + '/srv/');
    fs.writeFileSync(newDirectory + bookService, defaultBookService);
    fs.writeFileSync(newDirectory + bookHandlers, defaultBookHandlers);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createDefaultSrvService;
