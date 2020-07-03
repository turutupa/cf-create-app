const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

function updatePackageJson() {
  const msg = 'Updated package.json';
  try {
    const packageJsonDirectory = path.normalize(
      this.targetPath + '/package.json'
    );
    let packageJson = require(packageJsonDirectory);

    delete packageJson['cds'];
    packageJson.repository = 'https://github.com/turutupa/cf-create-app';
    packageJson.license = 'MIT';

    fs.writeFileSync(
      packageJsonDirectory,
      JSON.stringify(packageJson, null, 2)
    );
    addCheckMark(msg);
  } catch (e) {
    addXMark(msg);
  }
}

module.exports = updatePackageJson;
