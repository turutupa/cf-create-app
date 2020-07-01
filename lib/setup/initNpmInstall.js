const path = require('path');
var exec = require('child_process').exec;
async function installNpmModules(msg, path) {
  return new Promise((resolve, reject) => {
    try {
      console.log(msg);
      exec(
        'npm install',
        {
          cwd: path,
        },
        function (error, stdout, stderr) {
          // console.log('HANA Added');
          resolve(stdout);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
module.exports = async function initNpmInstall() {
  const rootPath = path.normalize(this.targetPath);
  const approuterPath = path.normalize(this.targetPath + '/approuter');
  const html5DeployerPath = path.normalize(this.targetPath + '/html5Deployer');

  await installNpmModules('Installing CAP modules', rootPath);
  await installNpmModules('Installing AppRouter modules', approuterPath);
  await installNpmModules('Installing HTML5 Deployer', html5DeployerPath);
};
