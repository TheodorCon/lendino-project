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

async function createAccount(account) {
  if (true) {
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
  } else throw Error('Invalid `project` object');
}

module.exports = {
  getProject,
  createProject,
  getAccount,
  createAccount,
};
