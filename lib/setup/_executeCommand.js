const util = require('util');
const exec = util.promisify(require('child_process').exec);
const animateProgress = require('../helpers/animateProgress');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');
const readline = require('readline');
const chalk = require('chalk');

module.exports = async function _executeCommand({ msg, command }) {
  return new Promise(async (resolve, reject) => {
    try {
      if (msg) {
        setTimeout(() => {
          process.stdout.write('\n');
          readline.cursorTo(process.stdout, 0);
          this.progressMessage = animateProgress(msg);
        }, 500);
      }

      const { stdout } = await exec(command);

      if (msg) {
        clearInterval(this.progressMessage);
        addCheckMark();
      }

      resolve(true);
    } catch (err) {
      console.error(chalk.red(err));
      addXMark();
      console.error(msg);
      clearInterval(this.progressMessage);
      reject(false);
    }
  });
};
