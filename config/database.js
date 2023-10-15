const sql = require('sqlite3');

const dbconnection = new sql.Database("db.sqlite", (err) => {
    if (err) {
        return res.status(500).json({ code: 500, message: "No se puede conectar a la base de datos"});
    }
})
module.exports = dbconnection;