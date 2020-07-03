const _executeCommand = require('./_executeCommand');
const path = require('path');

module.exports = async function createReactApp() {
  const reactPath = path.normalize(`${this.targetPath}/app`);
  const msg = `Creating React app "${this.appName}", this may take some time`;
  const command = `npx create-react-app ${reactPath}`;
  try {
    await _executeCommand({ msg, command });
  } catch (e) {
    console.log('Oops! Something went wrong creating react app!');
  }
};
