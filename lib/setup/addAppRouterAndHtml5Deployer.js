const fs = require('fs');
const path = require('path');

function addAppRouterAndHtml5Deployer() {
  const appRouterPackageJson = {
    name: `${this.appName}-approuter`,
    description: 'Approuter',
    version: '1.0.0',
    dependencies: {
      '@sap/approuter': '^6.8.2',
    },
    scripts: {
      start: 'node node_modules/@sap/approuter/approuter.js',
    },
  };

  // when uploading frontend app to html5 repo service all special chars
  // are deleted so we make sure app is lower case and no special chars
  const appNameHtml5Service = this.appName
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, '');

  const xsAppJson = {
    welcomeFile: '/index.html',
    authenticationMethod: 'none',
    routes: [
      {
        source: '/api/(.*)',
        target: '$1',
        destination: `srv-binding`,
        authenticationType: 'none',
      },
      {
        source: '^(.*)',
        target: `${appNameHtml5Service}/$1`,
        service: 'html5-apps-repo-rt',
      },
    ],
  };

  const html5DeployerPackageJson = {
    name: `${this.appName}-html5deployer`,
    engines: {
      node: '>=6.0.0',
    },
    dependencies: {
      '@sap/html5-app-deployer': '^2.0.0',
    },
    scripts: {
      start: 'node node_modules/@sap/html5-app-deployer/index.js',
    },
  };

  const rootPath = this.targetPath;
  try {
    fs.mkdirSync(path.normalize(rootPath + '/html5Deployer'));
  } catch (e) {}
  try {
    fs.writeFileSync(
      path.normalize(rootPath + '/html5Deployer/package.json'),
      JSON.stringify(html5DeployerPackageJson, null, 2)
    );
  } catch (e) {
    console.log('Something went wrong adding HTML5 Deployer App');
  }
  try {
    fs.mkdirSync(path.normalize(rootPath + '/approuter'));
  } catch (e) {}
  try {
    fs.writeFileSync(
      path.normalize(rootPath + '/approuter/package.json'),
      JSON.stringify(appRouterPackageJson, null, 2)
    );
  } catch (e) {
    console.log(e);
    console.log('Something went wrong adding AppRouter');
  }
  try {
    fs.writeFileSync(
      path.normalize(rootPath + '/approuter/xs-app.json'),
      JSON.stringify(xsAppJson, null, 2)
    );
  } catch (e) {
    console.log(e);
    console.log('Something went wrong adding xs-app.json to App Router');
  }
}

module.exports = addAppRouterAndHtml5Deployer;
