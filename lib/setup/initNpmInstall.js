const path = require('path');
var exec = require('child_process').exec;
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');
const animateProgress = require('../helpers/animateProgress');
const readline = require('readline');

async function installNpmModules(msg, path) {
  return new Promise((resolve, reject) => {
    let progressMessage;
    try {
      setTimeout(() => {
        readline.cursorTo(process.stdout, 0);
        progressMessage = animateProgress(msg);
      }, 500);

      exec(
        'npm install',
        {
          cwd: path,
        },
        function (error, stdout, stderr) {
          clearInterval(progressMessage);
          addCheckMark();
          resolve(stdout);
        }
      );
    } catch (e) {
      addXMark();
      reject(e);
    }
  });
}
module.exports = async function initNpmInstall() {
  const rootPath = path.normalize(this.targetPath);
  const approuterPath = path.normalize(this.targetPath + '/approuter');
  const html5DeployerPath = path.normalize(this.targetPath + '/html5Deployer');

  try {
    await installNpmModules('Installing CAP modules', rootPath);
    await installNpmModules('Installing AppRouter modules', approuterPath);
    if (this.frontendFramework) {
      await installNpmModules(
        'Installing HTML5 Deployer modules',
        html5DeployerPath
      );
    }
  } catch (e) {
    console.log('Something went wrong installing npm modules');
  }
};
