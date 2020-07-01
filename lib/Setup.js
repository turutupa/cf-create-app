// const setAppName = require('./setup/setAppName');
// const cfCredentialsCheck = require('./setup/cfCredentialsCheck');
// const createHtml5Service = require('./setup/createHtml5Service');
const runCdsInit = require('./setup/runCdsInit');
const createMtaFile = require('./setup/createMtaFile');
const createDefaultSchema = require('./setup/createDefaultSchema');
const createDefaultSrvService = require('./setup/createDefaultSrvService');
const initNpmInstall = require('./setup/initNpmInstall');
const createXsuaaService = require('./setup/createXsuaaService');
const createHanaService = require('./setup/createHanaService');
const updatePackageJson = require('./setup/updatePackageJson');
const createReactApp = require('./setup/createReactApp');
const setupCompletedMessage = require('./setup/setupCompletedMessage');
const addAppRouterAndHtml5Deployer = require('./setup/addAppRouterAndHtml5Deployer');
const renameMtaModules = require('./setup/renameMtaModules');
const reactappHtml5Tweak = require('./setup/reactappHtml5Tweak');

const scriptPath = __dirname;
const targetPathCwd = process.cwd();

class Setup {
  constructor(appName) {
    this.appName = appName;
    this.targetPath = `${targetPathCwd}/${appName}`;
    this.scriptPath = `${scriptPath}`;
  }

  async runCdsInit() {
    return await runCdsInit.apply(this);
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

  async reactappHtml5Tweak() {
    return await reactappHtml5Tweak.apply(this);
  }

  async setupCompletedMessage() {
    return await setupCompletedMessage.apply(this);
  }
}

module.exports = Setup;
