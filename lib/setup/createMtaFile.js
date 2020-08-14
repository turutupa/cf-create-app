const fs = require('fs');
const path = require('path');

function createMtaFile() {
  try {
    let yaml = '';
    if (this.frontendFramework) {
      yaml = '/mta.yaml';
    } else {
      yaml = '/clean.yaml';
    }
    const mtaDirectory = path.normalize(this.scriptPath + yaml);
    const mta = fs.readFileSync(mtaDirectory, 'utf8');
    const newMtaDirectory = path.normalize(this.targetPath + '/mta.yaml');

    fs.writeFileSync(newMtaDirectory, mta);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createMtaFile;
