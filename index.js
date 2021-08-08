const express = require('express');
const bodyParser = require('body-parser');
const application = express();

const ENDPOINTS = require('./controller').ENDPOINTS;

const port = '3000';

application.listen(port);
application.use(bodyParser.json());

// registering endpoints
for (const endpoint of ENDPOINTS) {
  switch (endpoint.type) {
    case 'get':
      application.route(endpoint.route).get(endpoint.action);
      break;
    case 'post':
      application.route(endpoint.route).post(endpoint.action);
      break;
    default:
      break;
  }
}

console.log(`server running on port ${port}`);
