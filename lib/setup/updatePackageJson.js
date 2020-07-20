const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

// what the heck does this file do?

// deletes cds property from package.json to
// do cds w and automatically start developing

// adds watch, dev scripts
function updatePackageJson() {
  const msg = 'Updated package.json';
  try {
    const packageJsonDirectory = path.normalize(
      this.targetPath + '/package.json'
    );
    let packageJson = require(packageJsonDirectory);

    // update properties
    // delete packageJson['cds'];
    packageJson.repository = 'https://github.com/turutupa/cf-create-app';
    packageJson.license = 'MIT';
    packageJson.scripts['dev:cds'] = 'npx cds watch';
    packageJson.scripts['dev:app'] = 'npm start --prefix app';
    packageJson.scripts.dev = 'concurrently npm:dev:*';
    packageJson.scripts.watch = 'npx cds watch';

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
