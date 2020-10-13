// const setAppName = require('./setup/setAppName');
// const cfCredentialsCheck = require('./setup/cfCredentialsCheck');
// const createHtml5Service = require('./setup/createHtml5Service');
const requestFrontendFramework = require('./setup/requestFrontendFramework');
const requestFrontendTemplate = require('./setup/requestFrontendTemplate');
const runCdsInit = require('./setup/runCdsInit');
const createMtaFile = require('./setup/createMtaFile');
const addDependencies = require('./setup/addDependencies');
const createDefaultSchema = require('./setup/createDefaultSchema');
const createDefaultSrvService = require('./setup/createDefaultSrvService');
const initNpmInstall = require('./setup/initNpmInstall');
const createXsuaaService = require('./setup/createXsuaaService');
const createHanaService = require('./setup/createHanaService');
const updatePackageJson = require('./setup/updatePackageJson');
const createReactApp = require('./setup/createReactApp');
const createVueApp = require('./setup/createVueApp');
const createAngularApp = require('./setup/createAngularApp');
const setupCompletedMessage = require('./setup/setupCompletedMessage');
const addAppRouterAndHtml5Deployer = require('./setup/addAppRouterAndHtml5Deployer');
const renameMtaModules = require('./setup/renameMtaModules');
const html5Tweak = require('./setup/html5Tweak');
const print = require('./setup/print');

// paths variables
// script path refers to cf-create-app script path
// target path refers to path where app is going to be installed
const scriptPath = __dirname;
const targetPathCwd = process.cwd();

const path = require('path');
const cdsPath = path.normalize(
  path.resolve(`${scriptPath}/../node_modules/@sap/cds-dk/bin/cds`)
);

class Setup {
  constructor(appName) {
    this.cdsInit = `node ${cdsPath} init`;
    this.cdsAdd = 'node node_modules/@sap/cds-dk/bin/add';
    this.appName = appName;
    this.targetPath = `${targetPathCwd}/${appName}`;
    this.scriptPath = `${scriptPath}`;
    this.progressMessage = -1;
    this.frontendFramework = null;
    this.frontendTemplate = null;
  }

  setFrontendFramework(framework) {
    this.frontendFramework = framework;
    return framework;
  }

  setFrontendTemplate(template) {
    this.frontendTemplate = template;
    return this;
  }

  async requestFrontendFramework() {
    return await requestFrontendFramework.apply(this);
  }

  async requestFrontendTemplate() {
    return await requestFrontendTemplate.apply(this);
  }

  async runCdsInit() {
    return await runCdsInit.apply(this);
  }

  async addDependencies() {
    return await addDependencies.apply(this);
  }

  async createDefaultSrvService() {
    return await createDefaultSrvService.apply(this);
  }

  async createDefaultSchema() {
    return await createDefaultSchema.apply(this);
  }

  async createMtaFile() {
    return await createMtaFile.apply(this);
  }

  async addAppRouterAndHtml5Deployer() {
    return await addAppRouterAndHtml5Deployer.apply(this);
  }

  async initNpmInstall() {
    return await initNpmInstall.apply(this);
  }

  async renameMtaModules() {
    return await renameMtaModules.apply(this);
  }

  async createXsuaaService() {
    return await createXsuaaService.apply(this);
  }

  async createHanaService() {
    return await createHanaService.apply(this);
  }

  async updatePackageJson() {
    return await updatePackageJson.apply(this);
  }

  async createReactApp() {
    return await createReactApp.apply(this);
  }

  async createVueApp() {
    return await createVueApp.apply(this);
  }

  async createAngularApp() {
    return await createAngularApp.apply(this);
  }

  async html5Tweak() {
    return await html5Tweak.apply(this);
  }

  async setupCompletedMessage() {
    return await setupCompletedMessage.apply(this);
  }

  async print(msg, color) {
    return await print.call(this, msg, color);
  }
}

module.exports = Setup;
