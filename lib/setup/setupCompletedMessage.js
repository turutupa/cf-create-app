const chalk = require('chalk');

const colored = (color) => (msg) => chalk[color](msg);
const blue = colored('cyan');
const start = 'npm run start';
const watch = 'npm run watch';
const dev = 'npm run dev';
const build = 'npm run build';
const deployDb = 'npx cds deploy --to hana/sqlite';

const log = (color) => (command) => (msg) => console.log(color(command), msg);
const logBlue = log(blue);

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
  logBlue(start)('to run cds application');
  logBlue(watch)('to watch cds application');
  logBlue(dev)('to watch cds application and react application (Recomended)');
  logBlue(build)('to build application for CF deployment');

  console.log(`
**  Reminder: before consuming your srv services don't forget 
    to deploy your database, to sqlite or hana.
    
    ${blue('npx cds deploy --to hana/sqlite')}


Happy Hacking! :)
  `);

  console.log(
    '\n------------------------------------------------------------------------------'
  );
}

module.exports = setupCompletedMessage;
