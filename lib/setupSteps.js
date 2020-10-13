const Setup = require('./Setup');

module.exports = async function runSetup(appName) {
  const setup = new Setup(appName);
  const REACT = 'react';
  const VUE = 'vue';
  const ANGULAR = 'angular';

  setup.print(
    `
                    Thank you for using cf-create-app!

            We are very excited to help you. To ensure the process 
            works properly, please make sure you have read the Git 
                  README so everything works as expected.

            Remember to open any issue if you encounter any problems.

                    Thank you very much! Have fun 😃
`
  );

  const frontendFramework = await setup.requestFrontendFramework();
  setup.setFrontendFramework(frontendFramework);
  if (setup.frontendFramework === REACT) {
    const frontendTemplate = await setup.requestFrontendTemplate();
    setup.setFrontendTemplate(frontendTemplate);
  }

  // cds init APPNAME
  const cdsInitiated = await setup.runCdsInit();

  // check if CAP project is installed properly,
  // if it didn't then we don't proceed with installation
  if (cdsInitiated) {
    // add default mta.yaml file
    setup.createMtaFile();

    // add @sap/cds-dk and concurrently and more..
    setup.addDependencies();

    // renames modules && resources in mta.yaml
    setup.renameMtaModules();

    // adds AppRouter and HTML5 Deployer applications
    setup.addAppRouterAndHtml5Deployer();

    // Installs CAP, AppRouter && HTML5 Deployer
    await setup.initNpmInstall();

    // Creates hana files in DB
    await setup.createHanaService();

    // adds default schema in dB so it is not empty
    setup.createDefaultSchema();

    // adds default srv service so it is not empty
    setup.createDefaultSrvService();

    switch (frontendFramework) {
      case REACT:
        await setup.createReactApp();
        break;
      case VUE:
        await setup.createVueApp();
        break;
      case ANGULAR:
        await setup.createAngularApp();
        break;
      default:
        break;
    }

    if (frontendFramework) {
      setup.html5Tweak();
    }

    // updates xs-security.json with new app name
    await setup.createXsuaaService();

    // Sets local DB to sqlite3
    setup.updatePackageJson();

    // displays completed message
    setup.setupCompletedMessage();
  } else {
    setup.print(
      `
                  Oops! CDS init failed! 
      Please make sure you have CDS installed and try again
      `,
      'blue'
    );
  }
};
