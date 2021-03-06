const sqlite = require('sqlite3');
const fs = require('fs');

if (!fs.existsSync('localDB.db')) {
  const db = new sqlite.Database('localDB.db');

  db.run('CREATE TABLE Project (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Goal INTEGER, Funded INTEGER)');
  db.run('CREATE TABLE Account (ID INTEGER PRIMARY KEY AUTOINCREMENT, Available INTEGER, Invested INTEGER)');
}
