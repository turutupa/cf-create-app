const fs = require('fs');
const path = require('path');

function updatePackageJson() {
  console.log('Update package.json');
  const packageJsonDirectory = path.normalize(
    this.targetPath + '/package.json'
  );
  let packageJson = require(packageJsonDirectory);

  delete packageJson['cds'];
  packageJson.repository = 'https://github.com/turutupa/cf-create-app';
  packageJson.license = 'MIT';

  fs.writeFileSync(packageJsonDirectory, JSON.stringify(packageJson, null, 2));
}

module.exports = updatePackageJson;
