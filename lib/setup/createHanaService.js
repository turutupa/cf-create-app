const path = require('path');
var exec = require('child_process').exec;
const addCheckMark = require('../helpers/checkmark');

module.exports = async function createHanaService() {
  return new Promise((resolve, reject) => {
    const msg = 'Added hana files';
    try {
      exec(
        `npx @sap/cds-dk add hana --force`,
        {
          cwd: path.normalize(this.targetPath),
        },
        function (error, stdout, stderr) {
          // console.log('HANA Added');
          resolve();
        }
      );
      addCheckMark(msg);
    } catch (e) {
      addXMark(msg);
      reject();
    }
  });
};
