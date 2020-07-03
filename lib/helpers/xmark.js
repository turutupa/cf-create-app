const chalk = require('chalk');

/**
 * Adds mark cross symbol
 */
function addXMark(msg) {
  const xMark = ' [✘] \n';
  if (msg) process.stdout.write(chalk.red(msg + xMark));
  else process.stdout.write(chalk.red(xMark));
}

module.exports = addXMark;
