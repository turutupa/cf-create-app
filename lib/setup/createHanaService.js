const path = require('path');

module.exports = async function createHanaService() {
  try {
    var exec = require('child_process').exec;
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
