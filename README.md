# Lendino project

I made this using a `sqlite3` database and `express.js` as the library to construct the REST API with.

In order to finitialize the project and instantiate the library, execute:

```shell
npm i
npm run initdb
```

This will create a `localDB.db` file, which contains the database.

The `db-access.js` contains functionality for accessing the database. `controller.js` specifies the endpoints of the API, with routes, request types and actions. `index.js` is the entry point of the program.

In order to start the API server, execute:

```shell
npm run start
```