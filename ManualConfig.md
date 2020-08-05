# Manual Configuration

You can build this boilerplate yourself following these manual steps.

This document will help you if you want to modify a specific behaviour of the CAP Boilerplate.

Make sure you meet the project pre-requisites described in [the project README file](/README.md#cloud-pre-requisites).


## 1. Create a CAP Project
Navigate to your workspace and create a new CAP project running:
```
cds init your-app-name
```

> This creates the backend application barebones with the recommended project structure and required dependencies. Read more about this in [CAP documentation - Getting Started](https://cap.cloud.sap/docs/cds/cdl#entity-and-type-definitions)

Create a `schema.cds` file in the `db/` folder and define your entities.

> Read more about CDS Entity and Type definition in [CAP documentation - Definition Language CDL (Entity and Type definitions)](https://cap.cloud.sap/docs/cds/cdl#entity-and-type-definitions)

Create a `yourServiceName-service.cds` file in the `srv/` folder and declare your services.

> Read more about CDS Service definition in [CAP documentation - Definition Language CDL (Services)](https://cap.cloud.sap/docs/cds/cdl#services)


## 2. Add a HANA database to your project
To persist your data in the cloud you might want to use a HANA database.
To be able to add a HANA DB to your project, you have to login to your CF account first: <br>
```
cf login -a CF_ACCOUNT_API_ENDPOINT
```

Follow the command prompt to enter your credentials and select the space where you want access the HANA Instance.

Then Add a HANA DB to the project with: <br>
```
cds add hana
```

> - This command adds a `db/src/.hdiconfig` file with the required information to conect to your HANA instance in the cloud, and sets the db "kind" to "hana" in your project `package.json` file. <br>
> - To be able to bind a HANA instance you must suscribe to **SAP HANA Schemas & HDI Containers** service via the Service Marketplace in your SAP Cloud Platform space.


## 3. Deploy your app with MTA
To deploy apps to our Cloud Foundry environment we will use the MTA concept. 

> MTA allows to deploy multiple application artifacts in one single file, making the process much simpler and avoiding errors. To know more about MTA visit the [documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/d04fc0e2ad894545aebfd7126384307c.html).

1. Add the MTA descriptor file
```
cds add mta
```
2. Create your build archive and deploy it
```
mbt build
cf deploy mta_archives/<your-app-mtar-archive-name>.mtar
```

Once the deployment is finished, the console logs the application endpoint as follows:
```
Application "cap-boilerplate-srv" started and available at "csi-development-team-factory-cfaccount-sandbox-cap-boil36d2a520.cfapps.eu10.hana.ondemand.com"
```

This is your API endpoint.

## 4. Add an HTML5 custom application as your FrontEnd app
At this point you probably want to add an UI to your application, and this could be a quite big topic depending on your needs.

There is no technology limitations in this area, so you can use whatever HTML5 and JavaScript based technology like SAP UI5, ReactJS, Angular, VueJS, or plain HTML5 and vanilla JavaScript for example.

As you can imagine, it is not feasible to make a tutorial for all the option in the market. The following lines details the process for the most common options, so it can guide you to follow an equivalent path for any other technology you might choose.

#### ***Adding a ReactJS application***
Create you React Application in the `/app` folder: <br>
```
cd app/
npx create-react-app .
```

### 4.1 Set your application ID
To host our HTML5 application we user the HTML5 Application Repository service. 
>To know more about this service [visit the documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/f8520f572a6445a7bfaff4a1bbcbe60a.html)

To identify our app in the HTML5 Application Repository, we have to provide an ID in the `manifest.json` file included in the application build.

#### ***Add the application ID for React Apps***

1. Navigate to the `app/public` folder.
2. In the `manifest.json` file add the following lines:
```
{
  ...

  "sap.app": {
    "id":"yourHtml5ApplicationId",
    "applicationVersion":{
      "version": "1.0.0"
    }
  }
}
```
> Make sure `yourHtml5ApplicationId` is unique in your HTML5 Application Repository. If there is another HTML5 application with the same `id` in the HTML5 Application Repository, a new deployment will overwrite it.

### 4.2 Add HTML5 Deployer
HTML5 application deployer handles the upload of the HTML5 applications content to the HTML5 Application Repository.

> For more information about the HTML5 Application Deployer read [the documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/9b178ab3388c4647b0c52f2c85641844.html)

1. Creates an `html5Deployer/` folder in the app root directory.
2. Add a new `package.json` file in the new `html5Deployer/` folder with the following content.
```
{
	"name": "html5Deployer",
	"engines": {
		"node": ">=6.0.0"
	},
	"dependencies": {
		"@sap/html5-app-deployer": "2.0.0"
	},
	"scripts": {
		"start": "node node_modules/@sap/html5-app-deployer/index.js"
	}
}
```

### 4.3 Update MTA.yaml file to include the HTML5 Application

Edit the `mta.yaml` file with your favourite text editor.

1. Add `deploy_mode: html5-repo` to the main `parameters` block
```
parameters:
  enable-parallel-deployments: true
  deploy_mode: html5-repo
```

2. Add the commands to build your HTML5 application to the `before-all > commands` block.

***For React Apps***
```
    - npm --prefix ./app install ./app
    - npm run build --prefix ./app
```

3. Add the following code to the `modules` block
```
 # --------------------- HTML5DEPLOYER MODULE -----------------
 - name: cap-boilerplate-hmtl5-deployer
 # ------------------------------------------------------------
   type: com.sap.html5.application-content
   path: html5Deployer
   requires:
    - name: cap-boilerplate-html5-host
   build-parameters:
    requires:
      - name: cap-boilerplate-app
        artifacts:
          - './*'
        target-path: resources/app

 # --------------------- REACT APP MODULE ---------------------
 - name: cap-boilerplate-app
 # ------------------------------------------------------------
   type: html5
   path: app
   build-parameters:
      supported-platforms: []
      build-result: build
```
4. Add the following code to the `resources` block
```
 # --------------------- HTML5 Runtime ----------------------
 - name: cap-boilerplate-html5-runtime
 # ------------------------------------------------------------
   parameters:
     service-name: cap-boilerplate-html5-runtime
     service-plan: app-runtime
     service: html5-apps-repo
   type: org.cloudfoundry.managed-service

# --------------------- HTML5 Host -------------------------
 - name: cap-boilerplate-html5-host
# ------------------------------------------------------------
   parameters:
     service-name: cap-boilerplate-html5-host
     service-plan: app-host
     service: html5-apps-repo
   type: org.cloudfoundry.managed-service
```
> You can change the `name` of your modules and resources, making them consistant with your project name. If you do it, make sure you keep the relationships between modules and resources using the correct names in the `requires` and `provides` blocks. 

## 5. The Application Router
The application router is the single point-of-entry for an application running in the Cloud Foundry environment on SAP Cloud Platform. The application router is used to serve static content, authenticate users, rewrite URLs, and forward or proxy requests to other micro services while propagating user information.

The following diagram illustrates where the App Router sits in a typical Cloud Foundry architecture:

![Cloud Foundry diagram with App Router](https://blogs.sap.com/wp-content/uploads/2017/07/SAP-CP-Connectivity-CF-02.png)

> This diagram includes a connection to an on-premise system which we will not see in this tutorial. Please review [this document for more details about this scenario](https://developers.sap.com/tutorials/cp-connectivity-consume-odata-service-approuter.html).

### 5.1 Add the Application Router to the project
1. Creates an `approuter/` folder in the app root folder.
2. Add a new `package.json` file in the new `approuter/` folder with the following content.
```
{
  "name": "approuter",
  "version": "1.0.0",
  "description": "My App Router",
  "dependencies": {
    "@sap/approuter": "^6.8.2"
  },
  "scripts": {
    "start": "node node_modules/@sap/approuter/approuter.js"
  }
}
```
3. Add a new `xs-app.json` file in the new `approuter/` folder with the following content. 
```
{	
  "welcomeFile": "/index.html",
  "authenticationMethod": "none",
  "routes":[{
    "source":"^(.*)",
    "target":"yourHtml5ApplicationId/$1",
    "service":"html5-apps-repo-rt"
  }]
}
```
> The `yourHtml5ApplicationId` must be the same included in the application `manifest.json` file, explained in the Step 4.1.

> The `xs-app.json` file describes the App router behaviour, like routing, authentication method, etc. <br> The configuration proposed above sends every HTTP request to the HTML5 application, with no authentication required. To modify this bahaviour, please read [the documentacion](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c103fb414988447ead2023f768096dcc.html)

### 5.2 Add XSUAA resource
Edit the `mta.yaml` file with your favourite text editor.

1. Add the following code to the `resources` block:
```
# --------------------- XSUAA Service ---------------------
 - name: cap-boilerplate-xsuaa
# ------------------------------------------------------------
   parameters:
      path: ./xs-security.json
      service-plan: application
      service: xsuaa
   type: org.cloudfoundry.managed-service
```
2. Create the `xs-security.json` file in root folder of the project with the following code
```
{
    "xsappname": "cap-boilerplate-approuter",
    "tenant-mode": "dedicated",
    "description": "Security profile of called application",
    "scopes": [
      {
        "name": "uaa.user",
        "description": "UAA"
      }
    ],
    "role-templates": [
      {
        "name": "Token_Exchange",
        "description": "UAA",
        "scope-references": [
          "uaa.user"
        ]
      }
    ]
  }
```

### 5.3 Update MTA.yaml file to include the App Router
Edit the `mta.yaml` file with your favourite text editor.

1. Add the following code to the `modules` block:
```
 # --------------------- APPROUTER MODULE ---------------------
 - name: cap-boilerplate-approuter
 # ------------------------------------------------------------
   type: approuter.nodejs
   path: approuter
   requires:
    - name: cap-boilerplate-html5-runtime
    - name: cap-boilerplate-xsuaa
```

## 6. Access data from your HTML5 app
To consume the services defined with CAP in Step 1 (and therefore, the data in our HANA DB) we have to set a destination pointing to our backend service (the CAP application) and configure the App Router to manage routing accodingly.

### 6.1 Set a destination in your mta.yaml file
Modify the App Router module definition as follows:
```
# --------------------- APPROUTER MODULE ---------------------
 - name: cap-boilerplate-approuter
# ------------------------------------------------------------
   type: approuter.nodejs
   path: approuter
   requires:
    - name: cap-boilerplate-html5-runtime
    - name: cap-boilerplate-xsuaa
    - name: srv-binding
      group: destinations
      properties:
        name: srv-binding
        url: ~{srv-url}
        forwardAuthToken: true
```

### 6.2 Configure your App Router to use the destination
The following configuration sets the Application Router to redirect all the `<host>:<port>/api` requests to your backend service via the destination called ***srv-binding***. Any other request will be redirected to the HTML5 application

```
{	
  "routes":[{
    "source": "/api/(.*)",
    "target": "$1",
    "destination": "srv-binding",
    "authenticationType": "none"
  },{
    "source":"^(.*)",
    "target":"yourHtml5ApplicationId/$1",
    "service":"html5-apps-repo-rt"
  }]
}
```

## 7. Re-deploy your application with the new components

Run:
```
mbt build
cf deploy mta_archives/<your-app-mtar-archive-name>.mtar
```

You can always get your MTA applications details running the command:
```
cf mta <your-mta-app-ID>
```
> Find the MTA App ID in the `mta.yaml` file 

> `cf mta` command is only available if your installed the MTA plugin for CF CLI mentioned in the [README file > Recommended tools](/README.md#recommended-tools)
