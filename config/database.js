const sql = require('better-sqlite3');

const dbconnection = new sql('db.sqlite', {});

dbconnection.pragma('journal_mode = WAL');

module.exports = dbconnection;