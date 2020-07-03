#!/usr/bin/env node

const cfCreateApp = require('../lib/cfCreateApp');
const chalk = require('chalk');

function init() {
  // Check node version: Node version 12 required
  let nodeVersion = process.version.split('.')[0];
  nodeVersion = nodeVersion.replace('v', '');
  nodeVersion = parseInt(nodeVersion);

  if (nodeVersion !== 12) {
    console.log(
      chalk.red(`
          Node version 12 required: please install node 12 and try again
    `)
    );
    return;
  }

  cfCreateApp();
}

init();
