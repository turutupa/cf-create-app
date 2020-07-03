const setup = require('./setupSteps');
const chalk = require('chalk');

function cfCreateApp() {
  const args = process.argv;

  if (args.length !== 3) {
    console.log(
      chalk.red(`
            Please run again using appropiate format: npx cf-create-app <APPNAME>
    `)
    );
    return;
  }

  setup(args[2]);
}

module.exports = cfCreateApp;
