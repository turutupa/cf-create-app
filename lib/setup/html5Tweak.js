/*
  In order for the app to work when deployed to CF using the HTML5 Repo Service
  some data must be appended to the manifest.json and an additional file must be
  created called xs-app.json.

  To facilitate the deployment process this small script creates/modifies those files
  for you but you will still need to have an active plan of HTML5 repo service in your
  account for this to work
*/

const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

module.exports = function () {
  const normalizePath = (base) => (p) => path.normalize(base + p);
  const targetPath = normalizePath(this.targetPath);

  const msg =
    'Installing build files for HTML5 Repo Service to work with Frontend App and updating xs-app.json in AppRouter';
  try {
    const appPackageJson = require(path.normalize(
      this.targetPath + '/app/package.json'
    ));
    const appname = this.appName.toLowerCase().replace(/[-_]/g, '');

    appPackageJson.name = appname;

    fs.writeFileSync(
      path.normalize(this.targetPath + '/app/package.json'),
      JSON.stringify(appPackageJson, null, 2)
    );

    const framework = this.frontendFramework;

    const isVueOrReact = framework === 'vue' || framework === 'react';
    const isAngular = framework === 'angular';

    // manifest to be modfied
    let manifestDirectory = '';
    if (isVueOrReact) {
      manifestDirectory = path.normalize(
        this.targetPath + '/app/public/manifest.json'
      );
    } else if (isAngular) {
      manifestDirectory = path.normalize(
        this.targetPath + '/app/src/manifest.json'
      );
    }

    let manifest = {};
    try {
      manifest = require(manifestDirectory);
    } catch (e) {}

    // update manifest with new parameters
    manifest['sap.app'] = {
      id: appname,
      applicationVersion: {
        version: '1.0.0',
      },
    };

    // Congratz!! New manifest for your html5 repo service!
    fs.writeFileSync(manifestDirectory, JSON.stringify(manifest, null, 2));

    // Create xs-app.json for HTML5 repo service
    let xsAppJsonDirectory = '';

    if (isVueOrReact) {
      xsAppJsonDirectory = targetPath('/app/public/xs-app.json');
    } else {
      xsAppJsonDirectory = targetPath('/app/src/xs-app.json');
    }

    const xsAppJson = {
      welcomeFile: '/index.html',
      routes: [
        {
          source: '^(.*)',
          target: '$1',
          service: 'html5-apps-repo-rt',
        },
      ],
    };

    // create new xs-app.json file
    fs.writeFileSync(
      xsAppJsonDirectory,
      JSON.stringify(xsAppJson, null, 2),
      'utf8'
    );

    // Angular specific tweaks
    if (isAngular) {
      // modify angular.json to accept the manifest.json and xs-app.json
      let angularJsonDirectory = targetPath('/app/angular.json');
      let angularJson = JSON.parse(
        fs.readFileSync(angularJsonDirectory, 'utf8')
      );

      let assets = angularJson.projects.app.architect.build.options.assets;
      assets.push('src/manifest.json');
      assets.push('src/xs-app.json');

      fs.writeFileSync(
        angularJsonDirectory,
        JSON.stringify(angularJson, null, 2),
        'utf8'
      );
    }

    addCheckMark(msg);
  } catch (e) {
    addXMark(msg);
  }
};
