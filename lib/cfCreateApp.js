const installationInit = require('./setupSteps');
const chalk = require('chalk');

function cfCreateApp() {
  const args = process.argv;

  if (args.length !== 3) {
    console.log(
      chalk.red(
        `
            Please run again using appropiate format: npx cf-create-app <APPNAME>
        `
      )
    );
    return;
  }

  const specialChar = "!@#$%^&*()+=[]';,./{}|:<>?";

  for (let char of args[2]) {
    if (specialChar.indexOf(char) !== -1) {
      console.log(
        chalk.red(
          `
                          You cannot use special characters '${char}'
              Please run again using appropiate format: npx cf-create-app <APPNAME>
          `
        )
      );
      return;
    }
  }

  installationInit(args[2]);
}

module.exports = cfCreateApp;
