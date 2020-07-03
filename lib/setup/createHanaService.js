const path = require('path');
var exec = require('child_process').exec;
const addCheckMark = require('../helpers/checkmark');

module.exports = async function createHanaService() {
  const msg = 'Added hana files';
  try {
    exec(
      'cds add hana --force',
      {
        cwd: path.normalize(this.targetPath),
      },
      function (error, stdout, stderr) {
        // console.log('HANA Added');
      }
    );
    addCheckMark(msg);
  } catch (e) {
    addXMark(msg);
  }
};
