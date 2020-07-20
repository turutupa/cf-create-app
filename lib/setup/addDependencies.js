const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

// Adds concurrently and cds-dk
// to run app locally after installation
function addDependencies() {
  const msg =
    'Adding @sap/cds-dk,@sap/hana-client and concurrently to package.json';
  try {
    const packageJsonDirectory = path.normalize(
      this.targetPath + '/package.json'
    );
    let packageJson = require(packageJsonDirectory);

    // update properties
    packageJson.dependencies['@sap/cds-dk'] = '^1.8.5';
    packageJson.dependencies['concurrently'] = '^5.2.0';
    packageJson.dependencies['@sap/hana-client'] = '^2.4.0';

    fs.writeFileSync(
      packageJsonDirectory,
      JSON.stringify(packageJson, null, 2)
    );
    addCheckMark(msg);
  } catch (e) {
    addXMark(msg);
  }
}

module.exports = addDependencies;
