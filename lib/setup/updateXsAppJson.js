const fs = require('fs');

module.exports = function updateXsAppJson(reactApp, srvBinding) {
  // update xs-app json in AppRouter
  const xsAppJsonDirectory = process.cwd() + '/approuter/xs-app.json';
  let xsAppJson = require(xsAppJsonDirectory);

  if (srvBinding) {
    xsAppJson.routes[0].destination = srvBinding;
  }

  if (reactApp) {
    xsAppJson.routes[1].target = `${reactApp}/$1`;
  }

  fs.writeFileSync(xsAppJsonDirectory, JSON.stringify(xsAppJson));
};
