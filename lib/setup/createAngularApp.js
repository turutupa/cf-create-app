const path = require('path');
var exec = require('child_process').exec;
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');
const animateProgress = require('../helpers/animateProgress');
const readline = require('readline');

async function installAngular(msg, route, command) {
  return new Promise((resolve, reject) => {
    let progressMessage;
    try {
      setTimeout(() => {
        readline.cursorTo(process.stdout, 0);
        progressMessage = animateProgress(msg);
      }, 500);

      exec(
        command,
        {
          cwd: route,
        },
        function (error, stdout, stderr) {
          clearInterval(progressMessage);
          if (error) {
            reject(error);
          }
          addCheckMark();
          resolve(stdout);
        }
      );
    } catch (e) {
      clearInterval(progressMessage);
      addXMark();
      reject(e);
    }
  });
}

module.exports = async function createVueApp() {
  const route = path.normalize(`${this.targetPath}`);
  const msg = `Creating Angular app "${this.appName}", this may take some time`;
  const command = `npx @angular/cli new --defaults --routing app`;
  try {
    await installAngular(msg, route, command);
  } catch (e) {
    console.log('Oops! Something went wrong creating Angular App!');
    console.log(e);
  }
};
