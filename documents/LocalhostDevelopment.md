# Localhost Development

This document explains how you can run your app in localhost while developing your business logic.

Make sure you meet the project pre-requisites described in [the project README file](/README.md#cloud-pre-requisites).


## 1. How to run your backend server
To run your CAP application locally just open a terminal in the root directory of your project and execute:
```
cds watch
```
> This command runs your app (usually in http://localhost:4004) and re-starts it whenever there is a change in the project.

CAP also gives you the possibility to choose which type of database you want to use when running your app locally. Read more about this concept in the [CAP Documentation > Using databases](https://cap.cloud.sap/docs/guides/databases)

### 1.1 Run you app with an in-memory volatile database
You can use a local in-memory database, which will not persist data once you stop your app. This is very conveniant when developing your data model or services, and you want to have a fresh empty database everytime you make a change. You can do this running:

```
cds run --in-memory
```

> If you want your app to run in this mode by default, remove the `db: { ... }` requirement block in the project `package.json` file, under the `cds > requires` node.

### 1.2 Run you app with a local SQLite database
Another option is running your app with a SQLite databse, storing your data locally in a .sql file. 

Run:
```
cds deploy --to sqlite
cds watch
```

### 1.3 Run you app in localhost with your HANA database
Finally you can also develop on your localhost using the remote HANA database in Cloud Foundry.

Run:
```
cds deploy --to hana
```
This will set your `db:kind` to `sql` in your project `package.json` file as follows:
```
"cds": {
  "requires": {
    "db": {
      "kind": "sql"
    }
  }
}
```
> `kind:sql` declares the requirement for an SQL database. It evaluates to `sqlite` in the development profile (active by default), while in production it equals `hana`. This way you don’t need to modify this file if you want to switch between the two databases.

If you want to force your project to use the HANA database when rinning in localhost, just change the `db:kind` to `hana` in the project `package.json` file as follows:
```
"cds": {
  "requires": {
    "db": {
      "kind": "hana"
    }
  }
}
```

Then run:
```
cds watch
```

## 2. How to run your HTML5 frontend app
Running your HTML5 application depends on the technology you are using to build your HTML5 app. Here we describe the steps we recommend for the most common ones:

### 2.1 React configuration
To start your React app run:
```
cd app
npm start
```
The app will tipically run on http://localhost:3000

#### ***Configure React Proxy to consume your localhost server***
React gives us a handy middleware to proxy certain requests. We will use it to proxy our `/api/` requests to our backend server running on http://localhost:4004

1. Create a `setupProxy.js` file in the `/app/src` folder with the following code:
```
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:4004/',
      changeOrigin: true
    })
  );
};
```
