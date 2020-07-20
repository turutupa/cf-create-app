const _executeCommand = require('./_executeCommand');
const path = require('path');

async function runCdsInit() {
  try {
    console.log(`npx @sap/cds-dk init ${this.appName}`);

    const statusCdsInit = await _executeCommand({
      command: `npx @sap/cds-dk init ${this.appName}`,
      // command: `${this.cdsInit} ${this.appName}`,
    });

    return statusCdsInit;
  } catch (e) {
    // console.log(e);
    return false;
  }
}

module.exports = runCdsInit;
