const chalk = require('chalk');

const colored = (color) => (msg) => chalk[color](msg);
const blue = colored('cyan');
const start = 'npm run start';
const watch = 'npm run watch';
const dev = 'npm run dev';

function setupCompletedMessage() {
  console.log(
    '------------------------------------------------------------------------------'
  );
  console.log(`
Success!             

Please read the documentation carefully if 
you may have any doubts and please do not 
hesitate to contact us if required
  `);
  console.log(`Created ${blue(this.appName)} at ${this.targetPath}`);

  console.log('\nRun the following commands:\n');
  console.log(blue(start), 'to execute npx cds run');
  console.log(blue(watch), 'to execute npx cds watch');
  console.log(blue(dev), 'to start watching server and react application\n');

  console.log(
    '------------------------------------------------------------------------------'
  );
}

module.exports = setupCompletedMessage;
