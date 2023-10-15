const sql = require('better-sqlite3');

const dbconnection = new sql('./database/db.sqlite', {});

dbconnection.pragma('journal_mode = WAL');

module.exports = dbconnection;