const sqlite = require('sqlite3');
const db = new sqlite.Database('localDB.db');

async function getProject(id) {
  if (id) {
    const selectStmt = db.prepare('SELECT * FROM Project WHERE ID = $id');
    return new Promise(function (resolve) {
      selectStmt.get({ $id: id }, (error, row) => {
        resolve(row);
      });
    });
  } else throw Error('Invalid project ID');
}

async function createProject(project) {
  if (project.name && project.goal) {
    const insertStmt = db.prepare(`INSERT INTO Project (Name, Goal, Funded) VALUES ($name, $goal, 0)`);

    return new Promise(function (resolve) {
      insertStmt.run({ $name: project.name, $goal: project.goal }, function (error) {
        const id = this.lastID;
        const selectStmt = db.prepare('SELECT * FROM Project WHERE ID = $id');

        selectStmt.get({ $id: id }, (error, row) => {
          resolve(row);
        });
      });
    });
  } else throw Error('Invalid `project` object');
}

async function getAccount(id) {
  if (id) {
    const selectStmt = db.prepare('SELECT * FROM Account WHERE ID = $id');
    return new Promise(function (resolve) {
      selectStmt.get({ $id: id }, (error, row) => {
        resolve(row);
      });
    });
  } else throw Error('Invalid project ID');
}

async function createAccount() {
    const insertStmt = db.prepare(`INSERT INTO Account (Available, Invested) VALUES (0, 0)`);

    return new Promise(function (resolve) {
      insertStmt.run({}, function (error) {
        const id = this.lastID;
        const selectStmt = db.prepare('SELECT * FROM Account WHERE ID = $id');

        selectStmt.get({ $id: id }, (error, row) => {
          resolve(row);
        });
      });
    });
}

async function deposit(accountId, amount) {
    const updateStmt = db.prepare(`UPDATE Account SET Available = Available + $amount WHERE ID = $accountId`);
    return new Promise(function (resolve) {
      updateStmt.run({ $accountId: accountId, $amount: amount }, function (error) {
        const selectStmt = db.prepare('SELECT * FROM Account WHERE ID = $accountId');
        selectStmt.get({ $accountId: accountId }, (error, row) => {
          resolve(row);
        });
      });
    });
}

async function invest(accountId, projectId, amount) {
    const updateProjectStmt = db
      .prepare('UPDATE Project SET Funded = Funded + ? WHERE ID = ?;')
      .bind(amount, projectId);
    const updateAccountStmt = db
      .prepare('UPDATE Account SET Available = Available - ?, Invested = Invested + ? WHERE ID = ?;')
      .bind(amount, amount, accountId);

    return new Promise(function (resolve) {
      db.serialize(function () {
        db.exec('BEGIN');
        updateProjectStmt.run();
        updateAccountStmt.run();
        db.exec('COMMIT');

        const selectStmt = db.prepare('SELECT * FROM Project WHERE ID = $projectId');

        selectStmt.get({ $projectId: projectId }, (error, row) => {
          resolve(row);
        });
      });
    });
}

module.exports = {
  getProject,
  createProject,
  getAccount,
  createAccount,
  invest,
  deposit,
};
