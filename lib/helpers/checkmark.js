// Kudos to React Boilerplate
const chalk = require('chalk');

/**
 * Adds mark check symbol
 */
function addCheckMark(msg) {
  const check = ' [✓] \n';
  if (msg) process.stdout.write(msg + chalk.green(check));
  else process.stdout.write(chalk.green(check));
}

module.exports = addCheckMark;
