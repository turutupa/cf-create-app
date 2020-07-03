const _executeCommand = require('./_executeCommand');

async function runCdsInit() {
  try {
    console.log(`cds init ${this.appName}`);
    const statusCdsInit = await _executeCommand({
      command: `cds init ${this.appName}`,
    });

    return statusCdsInit;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = runCdsInit;
