const dbAccess = require('./db-access');

const ENDPOINTS = [
  {
    route: '/create-project',
    type: 'post',
    action: async function (request, response) {
      const project = request.body;

      try {
        const result = await dbAccess.createProject(project);
        response.status(200);
        response.json(result);
      } catch (error) {
        response.status(500);
        response.json({ error: error });
      }
    },
  },
  {
    route: '/project/:id',
    type: 'get',
    action: async function (request, response) {
      try {
        const id = request.params.id;
        const project = await dbAccess.getProject(id);
        if (project) {
          response.status(200);
          response.json(project);
          return;
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(500);
        response.json({
          message: 'An error occured',
          details: error,
        });
      }
    },
  },
  {
    route: '/create-account',
    type: 'post',
    action: async function (request, response) {
      try {
        const result = await dbAccess.createAccount();
        response.status(200);
        response.json(result);
      } catch (error) {
        response.status(500);
        response.json({ error: error });
      }
    },
  },
  {
    route: '/account/:id',
    type: 'get',
    action: async function (request, response) {
      try {
        const id = request.params.id;
        const account = await dbAccess.getAccount(id);
        if (account) {
          response.status(200);
          response.json(account);
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(500);
        response.json({
          message: 'An error occured',
          details: error,
        });
      }
    },
  },
  {
    route: '/account/:id/deposit',
    type: 'post',
    action: async function (request, response) {
      try {
        const accountId = request.params.id;
        const amount = request.body.amount;
        const account = await dbAccess.getAccount(accountId);

        if (account) {
          const updatedAccount = await dbAccess.deposit(accountId, amount);
          response.status(200);
          response.json(updatedAccount);
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(500);
        response.json({
          message: 'An error occured',
          details: error,
        });
      }
    },
  },
  {
    route: '/project/:id/invest',
    type: 'post',
    action: async function (request, response) {
      try {
        const projectId = request.params.id;
        const accountId = request.body.accountId;
        const amount = request.body.amount;

        const project = await dbAccess.getProject(projectId);
        const account = await dbAccess.getAccount(accountId);

        if (project && account) {
          if (account.Available < amount) {
            response.status(500);
            response.json({ error: 'Not enough available funds for this action' });
            return;
          }
          if (project.Funded + amount > project.Goal) {
            response.status(500);
            response.json({ error: 'Cannot invest that high of an amount' });
            return;
          }

          const updatedProject = await dbAccess.invest(accountId, projectId, amount);

          response.status(200);
          response.json(updatedProject);
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(500);
        response.json({
          message: 'An error occured',
          details: error,
        });
      }
    },
  },
];

module.exports = {
  ENDPOINTS,
};
