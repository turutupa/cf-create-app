const MtaEditor = require('./mtaEditor/MtaEditor');
const path = require('path');

// by default it diretory is not specified
// it will always search for yaml file
// in root directory
class MtaBuilder {
  constructor(scriptPath, targetPath) {
    this.scriptPath = scriptPath;
    this.targetPath = targetPath;
  }

  replaceAll(oldValue, newValue) {
    let mta = MtaEditor.load(path.normalize(`${this.targetPath}/mta.yaml`));
    var regEx = new RegExp(oldValue, 'g');
    const newMta = mta.replace(regEx, newValue);
    MtaEditor.write(newMta, path.normalize(`${this.targetPath}/mta.yaml`));
  }
}

module.exports = MtaBuilder;
