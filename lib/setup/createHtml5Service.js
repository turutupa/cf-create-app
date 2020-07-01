const _executeCommand = require('./_executeCommand');

module.exports = async function createHtml5Service() {
  try {
    const html5Host = `${this.appName}-html5-host`;
    const html5Runtime = `${this.appName}-html5-runtime`;
    let hostCommand = `cf create-service html5-apps-repo app-host ${html5Host}`;
    let runtimeCommand = `cf create-service html5-apps-repo app-runtime ${html5Runtime}`;

    if (this.appName) {
      await _executeCommand({
        msg: hostCommand,
        command: hostCommand,
      });
    }
    if (this.appName) {
      await _executeCommand({
        msg: runtimeCommand,
        command: runtimeCommand,
      });
    }
  } catch (e) {
    console.log('Oops! Something went wrong creating HTML5 repo');
  }
};
