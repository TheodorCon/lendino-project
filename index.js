const express = require('express');
const bodyParser = require('body-parser');
const application = express();

const dbAccess = require('./db-access');

const port = '3000';

application.listen(port);
application.use(bodyParser.json());

application.route('/create-project').post(async function (request, response) {
  const project = request.body;

  try {
    const result = await dbAccess.createProject(project);
    response.status(200);
    response.json(result);
  } catch (error) {
    response.status(500);
    response.json({ error: error });
  }
});

application.route('/project/:id').get(async function (request, response) {
  try {
    const id = request.params.id;
    const project = await dbAccess.getProject(id);
    if (project) {
      response.status(200);
      response.json(project);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {}
});

application.route('/create-account').post(async function (request, response) {
  const account = request.body;

  try {
    const result = await dbAccess.createAccount(account);
    response.status(200);
    response.json(result);
  } catch (error) {
    response.status(500);
    response.json({ error: error });
  }
});

application.route('/account/:id').get(async function (request, response) {
  try {
    const id = request.params.id;
    const project = await dbAccess.getAccount(id);
    if (project) {
      response.status(200);
      response.json(project);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {}
});

console.log(`server running on port ${port}`);
