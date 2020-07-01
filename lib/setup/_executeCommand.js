const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function _executeCommand({ msg, command }) {
  return new Promise(async (resolve, reject) => {
    try {
      if (msg) console.log(msg);
      const { stdout, stderr } = await exec(command);
      await console.log(stdout);
      // await console.log(stderr);
      resolve(true);
    } catch (err) {
      console.error(err);
      console.error('Oops! Something went wrong!');
      reject(false);
    }
  });
};
