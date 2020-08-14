function renameMtaModules() {
  const path = require('path');
  const MtaBuilder = require(path.normalize(
    this.scriptPath + '/mtaBuilder/MtaBuilder'
  ));
  const mtaPlaceholderConstants = require(path.normalize(
    this.scriptPath + '/mtaPlaceholderConstants'
  ));

  const framework = this.frontendFramework;

  try {
    const mtaBuilder = new MtaBuilder(this.scriptPath, this.targetPath);

    // update approuter
    const approuter = this.appName + '-approuter';
    mtaBuilder.replaceAll(mtaPlaceholderConstants.appRouterName, approuter);

    // update html5 deployer
    if (framework) {
      const html5Deployer = this.appName + '-hmtl5-deployer';
      mtaBuilder.replaceAll(
        mtaPlaceholderConstants.html5DeployerName,
        html5Deployer
      );
    }

    // update hana module and resource
    const hdiName = this.appName + '-hdi';
    const dbName = this.appName + '-db';
    mtaBuilder.replaceAll(mtaPlaceholderConstants.hdiName, hdiName);
    mtaBuilder.replaceAll(mtaPlaceholderConstants.dbName, dbName);

    // update html5 repo host and runtime
    if (framework) {
      const html5Host = `${this.appName}-html5-host`;
      const html5Runtime = `${this.appName}-html5-runtime`;
      mtaBuilder.replaceAll(
        mtaPlaceholderConstants.html5RepoHostName,
        html5Host
      );
      mtaBuilder.replaceAll(
        mtaPlaceholderConstants.html5RepoRuntimeName,
        html5Runtime
      );
    }

    // update frontent app
    if (framework) {
      const newAppName = this.appName + '-html5-app';
      mtaBuilder.replaceAll(mtaPlaceholderConstants.appName, newAppName);
    }

    // if frontend app is angular also change build folder
    // instead of build is called dist by default in angular
    const isAngular = framework === 'angular';
    const isReact = framework === 'react';
    const isVue = framework === 'vue';
    const oldBuildResult = 'build-result: build-folder';

    if (isReact) {
      const newBuildResult = 'build-result: build';
      mtaBuilder.replaceAll(oldBuildResult, newBuildResult);
    }

    if (isVue) {
      const newBuildResult = 'build-result: dist';
      mtaBuilder.replaceAll(oldBuildResult, newBuildResult);
    }

    if (isAngular) {
      const newBuildResult = 'build-result: dist/app';
      mtaBuilder.replaceAll(oldBuildResult, newBuildResult);

      // update front end memory size
      // angular is a bit heavier, we add some memory
      const oldMemorySize = 'sizeLimit: 2';
      const newMemorySize = 'sizeLimit: 8';
      mtaBuilder.replaceAll(oldMemorySize, newMemorySize);
    }

    // update XSUAA resource
    const xsuaaName = `${this.appName}-xsuaa`;
    mtaBuilder.replaceAll(mtaPlaceholderConstants.xsuaaName, xsuaaName);

    // update server
    // const newSrvName = `${this.appName}-srv`;
    // const srvBinding = newSrvName + '-binding';
    // mtaBuilder.replaceAll(mtaPlaceholderConstants.srvProvidesName, srvBinding);
    // mtaBuilder.replaceAll(mtaPlaceholderConstants.srvName, newSrvName);

    // update mta ID
    const defaultId = 'cap-boilerplate';
    mtaBuilder.replaceAll(defaultId, this.appName);
  } catch (e) {
    console.log(
      'Something went wrong renaming names in MTA. It is advised to re-run "npm run setup"'
    );
  }
}

module.exports = renameMtaModules;
