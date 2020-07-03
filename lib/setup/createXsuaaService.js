const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

module.exports = async function createXsuaaService() {
  try {
    const xsuaaName = `${this.appName}-xsuaa`;
    const xsSecurity = require(path.normalize(
      this.scriptPath + '/xs-security.json'
    ));

    console.log('Creating xs-securty.json');

    xsSecurity.xsappname = xsuaaName;
    fs.writeFileSync(
      path.normalize(this.targetPath + '/xs-security.json'),
      JSON.stringify(xsSecurity, null, 2)
    );
    addCheckMark();
  } catch (e) {
    addXMark();
    console.log('Oops! Something went wrong: ');
  }
};
