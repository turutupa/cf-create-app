![Header Image][header-image]

<div align="center">
  <h1 align="center">cf-create-app</h1>
  <p align="center">
    <a href="https://github.com/Turutupa/cf-create-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Turutupa/cf-create-app/issues">Report Bug</a>
    |
    <a href="https://github.com/Turutupa/cf-create-app/issues">Request Feature</a>
    <br />
    <br />
  </p>
</div>
<br />

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Cloud prerequisites](#cloud-prerequisites)
  - [Recommended tools](#recommended-tools)
- [Usage](#usage)
  - [Create your app](#create-your-app)
  - [Add your business logic](#add-your-business-logic)
  - [Deploy the app](#deploy-the-app)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

This project is meant to simplify the initial configuration needed to create and deploy an end-to-end application to a Cloud Foundry account in SAP Cloud Platform.

What cf-create-app does for you?

1. Creates a basic CAP application
2. Adds a simple React, Angular or Vue application to your project
3. Adds an HTML5 Deployer to the project
4. Adds an Application Router to the project
5. Adds the HTML5 Application Repository service (app-host and app-runtime) to the project
6. Adds the Authentication and Authorization service (XSUAA) to the project
7. Bind all modules together as a MTA application, ready to be deployed in a Cloud Foundry environment

### Built With

cf-create-app uses the following technologies and frameworks:

- [SAP Cloud Application Programming Model (CAP)][cap-documentation]
- [SAP Application Router][app-router-documentation]
- [Multi Target Applications (MTA)][mta-documentation]
- [SAP HTML5 Application Repository][html5-app-repo-documentation]
- [SAP XSUAA service][xsuaa-documentation]
- Any HTML5 application frameworks (e.g. ReactJS, Angular, VueJS, SAP UI5, ...)

<!-- GETTING STARTED -->

## Getting Started

Setting and end-to-end application in SAP Cloud Platform is not a trivial task.

This tool creates a project with all the components you need to build (and easily deploy) a web application with a CAP backend exposing OData services, and an HTML5 application ready to consume those services.

### Prerequisites

| Pre-requisite | Description                                                            | Documentation                    |
| ------------- | ---------------------------------------------------------------------- | -------------------------------- |
| Node.js v12   | Required runtime for this boilerplate. Recommended install it with NVM | [Download][nodejs-documentation] |
| cf cli        | Cloud Foundy CLI tool                                                  | [Download][cf-cli-download]      |

### Cloud prerequisites

To be able to deploy this application you need an SAP Cloud Platform account in the Cloud Foundry (CF) environment.

In your CF account space, the following services must be available:

- HTML5 Application Repository | `html5-apps-repo`
- SAP HANA Schemas & HDI Containers | `hana`
- Authorization & Trust Management | `xsuaa`

### Recommended tools

| Tools                                       | Description                                                                            | Documentation                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- |
| VS Code CDS extension                       | VS Code extension with code complete and other tools for CDS development               | [Download][vscode-ext-download]    |
| MTA Plugin for CF CLI                       | Plugin to add useful commands to manage MTA applications using CF CLI                  | [Download][mta-cf-plugin-download] |
| HTML5 Applications Repository CF CLI Plugin | Plugin to add useful commands to manage HTML5 Application Repository apps using CF CLI | [Download][html5-repo-cf-plugin]   |

<!-- USAGE EXAMPLES -->

## Usage

### Create your app

Open a terminal in your workspace directory and run:

```sh
npx cf-create-app YOUR_APP_NAME
```
In the comand prompt, choose the frontend framework you prefer:

![UI framework command prompt][UI-framework-command-prompt]

In the comand prompt, choose the frontend framework you prefer:

![UI framework command prompt][ui-framework-command-prompt]

The new project contains these folders and files, following the recommended project layout:

| File / Folder    | Purpose                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `app/`           | content for UI frontends go here                                                                          |
| `approuter/`     | Application Router configuration files                                                                    |
| `db/`            | your domain models and data go here                                                                       |
| `html5Deployer/` | helper application to deploy HTML5 apps to the HTML5 Application Repository service in SAP Cloud Platform |
| `srv/`           | your service models and code go here                                                                      |
| `package.json`   | project metadata and configuration                                                                        |
| `README.md`      | this getting started guide                                                                                |

### Add your business logic

- Add/modify entities to your DB schema on `db/` folder
- Add/modify services to your backend app in the `srv/` folder
- Add/modify your custom HTML5 application in the `app/` folder
- Modify the Application Router behaviour on `approuter/xs-app.json`

### Deploy the app

Open a terminal in the project root directory and run:

```sh
mbt build
cf deploy mta_archives/yourAppMtarArchiveName.mtar
```

## Next steps

### HOW TO: Run and develop your app in localhost

Learn more about localhost development on: [Localhost Development][localhost-dev-documentation]

### HOW TO: Create this boilerplate manually step-by-step

Learn more about manual configuration on: [Manual Configuration][step-by-step-documentation]

<!-- ROADMAP -->

## Roadmap

These are some of our backlog items

- Add UI5 app via setup script and document it
- Include test automation to the setup script and documentation
- Add CI/CD pipeline with Jenkins

See the [open issues](https://github.com/Turutupa/cf-create-app/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

- Alberto Delgado - [![LinkedIn][linkedin-shield]][linkedin-url-alberto]
- Rafael López - [![LinkedIn][linkedin-shield]][linkedin-url-rafa]
- Sergio Delgado - [![LinkedIn][linkedin-shield]][linkedin-url-sergio]

Project Link: [https://github.com/Turutupa/cf-create-app](https://github.com/Turutupa/cf-create-app)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Img Shields](https://shields.io)
- [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url-alberto]: https://www.linkedin.com/in/albertodelgadocabrera/
[linkedin-url-rafa]: https://www.linkedin.com/in/rafaellopezmartinez/
[linkedin-url-sergio]: https://www.linkedin.com/in/sergio-delgado-98b66ba0/
[nodejs-documentation]: https://nodejs.org/en/download/package-manager/
[cds-cli-download]: https://cap.cloud.sap/docs/about/#development-tools
[mbt-cli-download]: https://sap.github.io/cloud-mta-build-tool/download/
[cf-cli-download]: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
[vscode-ext-download]: https://tools.hana.ondemand.com/#cloud-vscodecds
[mta-cf-plugin-download]: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e93b231895b64cbc9221a62953563a6f.html
[html5-repo-cf-plugin]: https://github.com/SAP/cf-html5-apps-repo-cli-plugin
[cap-documentation]: https://cap.cloud.sap/docs/
[app-router-documentation]: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/01c5f9ba7d6847aaaf069d153b981b51.html
[mta-documentation]: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/d04fc0e2ad894545aebfd7126384307c.html
[html5-app-repo-documentation]: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/f8520f572a6445a7bfaff4a1bbcbe60a.html
[xsuaa-documentation]: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/28eb34a6eda740a395ff6b0496f3bffb.html
[localhost-dev-documentation]: https://github.com/Turutupa/cf-create-app/blob/master/documents/LocalhostDevelopment.md
[step-by-step-documentation]: https://github.com/Turutupa/cf-create-app/blob/master/documents/ManualConfig.md
[ui-framework-command-prompt]: https://i.imgur.com/fo6K4TV.jpg
[header-image]: https://github.com/Turutupa/cf-create-app/blob/master/logos.png?raw=true