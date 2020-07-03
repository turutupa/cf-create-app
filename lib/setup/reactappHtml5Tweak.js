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
  console.log(
    '\nInstalling build files for HTML5 Repo Service to work with React App and updating xs-app.json in AppRouter'
  );
  try {
    const reactPackageJson = require(path.normalize(
      this.targetPath + '/app/package.json'
    ));
    const appname = this.appName.toLowerCase();

    reactPackageJson.name = appname;

    fs.writeFileSync(
      path.normalize(this.targetPath + '/app/package.json'),
      JSON.stringify(reactPackageJson, null, 2)
    );

    // manifest to be modfied
    const manifestDirectory = path.normalize(
      this.targetPath + '/app/public/manifest.json'
    );
    const manifest = require(manifestDirectory);

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
    const xsAppJsonDirectory = path.normalize(
      this.targetPath + '/app/public/xs-app.json'
    );
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
    addCheckMark();
  } catch (e) {
    addXMark();
  }
};
