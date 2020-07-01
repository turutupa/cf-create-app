# Project Introduction

This project is meant to simplify the initial configuration needed to create and deploy an end-to-end application to the SAP Cloud Platform.

What CAP Boilerplate Setup script does for you?

1. Creates a basic CAP application
2. Adds a HANA database to the project
3. Adds a simple React application to your project
4. Adds a HTML5 Deployer to the project
5. Adds an Application Router to the project
6. Adds the HTML5 Application Repository service (app-host and app-runtime) to the project
7. Adds the Authentication and Authorization service (XSUAA) to the project
8. Bind all modules together as a MTA application, ready to be deployed in a Cloud Foundry environment

CAP Boilerplate uses the following technologies and frameworks:

- SAP Cloud Application Programming Model (CAP)
- SAP Application Router
- Multi Target Applications (MTA)
- SAP HTML5 Application Repository
- SAP XSUAA service
- HTML5 application frameworks (e.g. ReactJS, SAP UI5, VueJS, ...)

## Cloud pre-requisites

To be able to deploy this application you need an SAP Cloud Platform account in the Cloud Foundry (CF) environment.

In your CF account space, the following services must be available:

- HTML5 Application Repository | `html5-apps-repo`
- SAP HANA Schemas & HDI Containers | `hana`
- Authorization & Trust Management | `xsuaa`

## Pre-requisites for local development

This project requires several `@sap` npm dependencies. Make sure you configure your npm registry to pull this dependencies form the SAP NPM repository:

```
npm config set @sap:registry https://npm.sap.com/
```

| Pre-requisite | Description                                                            | Documentation                                            |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| Node.js v12   | Required runtime for this boilerplate. Recommended install it with NVM | https://nodejs.org/en/download/package-manager/          |
| cds cli       | CLI for cds and CAP development <br> `npm i -g @sap/cds-dk`            | https://cap.cloud.sap/docs/about/#development-tools      |
| mbt cli       | CLI tool for MTA build process <br> `install -g mbt`                   | https://sap.github.io/cloud-mta-build-tool/download/     |
| cf cli        | Cloud Foundy CLI tool                                                  | https://docs.cloudfoundry.org/cf-cli/install-go-cli.html |

## Recommended tools

| Tools                                       | Description                                                                            | Documentation                                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| VS Code CDS extension                       | VS Code extension with code complete and other tools for CDS development               | https://tools.hana.ondemand.com/#cloud-vscodecds                                                               |
| MTA Plugin for CF CLI                       | Plugin to add useful commands to manage MTA applications using CF CLI                  | https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e93b231895b64cbc9221a62953563a6f.html |
| HTML5 Applications Repository CF CLI Plugin | Plugin to add useful commands to manage HTML5 Application Repository apps using CF CLI | https://github.com/SAP/cf-html5-apps-repo-cli-plugin                                                           |

# Getting Started

### Initial setup

1. Clone the repository
2. Open a new terminal in the app folder and run:

```
npm run setup
```

Your CAP Boilerplate project contains these folders and files, following the recommended project layout:

| File / Folder    | Purpose                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `app/`           | content for UI frontends go here                                                                          |
| `approuter/`     | Application Router configuration files                                                                    |
| `db/`            | your domain models and data go here                                                                       |
| `documents/`     | project specific documentation files                                                                      |
| `html5Deployer/` | helper application to deploy HTML5 apps to the HTML5 Application Repository service in SAP Cloud Platform |
| `setup/`         | the CAP Boilerplate setup script files                                                                    |
| `srv/`           | your service models and code go here                                                                      |
| `package.json`   | project metadata and configuration                                                                        |
| `README.md`      | this getting started guide                                                                                |

### Add your business logic

You can add your business logic to the application.

- Add/modify entities to your DB schema on [db/schema.cds](db/schema.cds)
- Add/modify services to your backend app in the [srv/](srv/) folder
- Add/modify your custom HTML5 application in the [app/](app/) folder
- Modify the Application Router behaviour on [approuter/xs-app.json](approuter/xs-app.json)

### Deploy your app

1. Build your MTA deployable archive:

```
mbt build
```

2. Deploy your app:

```
cf deploy mta_archives/<yourMtaArchiveName.mtar>
```

# Next Steps

## HOW TO: Run and develop your app in localhost

Learn more about localhost development on: [Localhost Development](documents/LocalhostDevelopment.md)

## HOW TO: Create this boilerplate manually step-by-step

Learn more about manual configuration on: [Manual Configuration](documents/ManualConfig.md)

# Future Improvements

- Reduce the initial required files to the minimum (ideally just a `package.json` file and the `setup/` files)
- Add UI5 app via setup script and document it
- Include test automation to the setup script and documentation
- Add CI/CD pipeline with Jenkins
