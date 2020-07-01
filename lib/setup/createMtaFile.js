const fs = require('fs');
const path = require('path');

function createMtaFile() {
  try {
    const mtaDirectory = path.normalize(this.scriptPath + '/mta.yaml');
    const mta = fs.readFileSync(mtaDirectory, 'utf8');
    const newMtaDirectory = path.normalize(this.targetPath + '/mta.yaml');

    fs.writeFileSync(newMtaDirectory, mta);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createMtaFile;
