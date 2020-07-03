const chalk = require('chalk');

module.exports = function print(msg, color) {
  console.log(
    '\n------------------------------------------------------------------------------'
  );
  console.log(chalk[color ? color : 'white'](msg));
  console.log(
    '------------------------------------------------------------------------------'
  );
};
