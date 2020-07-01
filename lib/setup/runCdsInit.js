const _executeCommand = require('./_executeCommand');

async function runCdsInit() {
  try {
    await _executeCommand({
      msg: 'Installing CAP',
      command: `cds init ${this.appName}`,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = runCdsInit;
