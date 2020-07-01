function renameMtaModules() {
  const path = require('path');
  const MtaBuilder = require(path.normalize(
    this.scriptPath + '/mtaBuilder/MtaBuilder'
  ));
  const mtaPlaceholderConstants = require(path.normalize(
    this.scriptPath + '/mtaPlaceholderConstants'
  ));

  try {
    // update approuter
    const approuter = this.appName + '-approuter';
    const mtaBuilder = new MtaBuilder(this.scriptPath, this.targetPath);
    mtaBuilder.replaceAll(mtaPlaceholderConstants.appRouterName, approuter);

    // update html5 deployer
    const html5Deployer = this.appName + '-hmtl5-deployer';
    mtaBuilder.replaceAll(
      mtaPlaceholderConstants.html5DeployerName,
      html5Deployer
    );

    // update hana module and resource
    const hdiName = this.appName + '-hdi';
    const dbName = this.appName + '-db';
    mtaBuilder.replaceAll(mtaPlaceholderConstants.hdiName, hdiName);
    mtaBuilder.replaceAll(mtaPlaceholderConstants.dbName, dbName);

    // update html5 repo host and runtime
    const html5Host = `${this.appName}-html5-host`;
    const html5Runtime = `${this.appName}-html5-runtime`;
    mtaBuilder.replaceAll(mtaPlaceholderConstants.html5RepoHostName, html5Host);
    mtaBuilder.replaceAll(
      mtaPlaceholderConstants.html5RepoRuntimeName,
      html5Runtime
    );

    // update react app
    mtaBuilder.replaceAll(mtaPlaceholderConstants.appName, this.appName);

    // update XSUAA resource
    const xsuaaName = `${this.appName}-xsuaa`;
    mtaBuilder.replaceAll(mtaPlaceholderConstants.xsuaaName, xsuaaName);

    // update server
    const newSrvName = `${this.appName}-srv`;
    const srvBinding = newSrvName + '-binding';
    mtaBuilder.replaceAll(mtaPlaceholderConstants.srvProvidesName, srvBinding);
    // mtaBuilder.replaceAll(mtaPlaceholderConstants.srvName, newSrvName);

    // update mta ID
    const defaultId = 'cap-boilerplate';
    mtaBuilder.replaceAll(defaultId, this.appName);
  } catch (e) {
    console.log(e);
    console.log(
      'Something went wrong renaming names in MTA. It is advised to re-run "npm run setup"'
    );
  }
}

module.exports = renameMtaModules;
