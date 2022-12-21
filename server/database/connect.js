const sql = require("mssql/msnodesqlv8");
const config = require("../configs");

const conn = new sql.ConnectionPool({
    server: config.db.host_server,
    driver: "msnodesqlv8",
    database: config.db.database,
    port: config.db.db_port,
    options: {
        trustedConnection: true,
    },
}).connect();

module.exports = {
    conn,
    sql,
};