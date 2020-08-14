const _executeCommand = require('./_executeCommand');
const path = require('path');

async function runCdsInit() {
  try {
    console.log(`Initiating CAP in ${this.appName}...`);

    const statusCdsInit = await _executeCommand({
      command: `npx @sap/cds-dk init ${this.appName}`,
    });

    return statusCdsInit;
  } catch (e) {
    return false;
  }
}

module.exports = runCdsInit;
