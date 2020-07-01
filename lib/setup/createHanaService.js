const path = require('path');
var exec = require('child_process').exec;

module.exports = async function createHanaService() {
  console.log('Adding hana files');
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
  } catch (e) {
    console.log('Something went wrong running "cds add hana"');
  }
};
