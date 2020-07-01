const setup = require('./setupSteps');

function cfCreateApp() {
  const args = process.argv;

  if (args.length !== 3) {
    console.log(
      'Please run again using appropiate format: npx cf-create-app <APPNAME>'
    );
    return;
  }

  setup(args[2]);
}

module.exports = cfCreateApp;
