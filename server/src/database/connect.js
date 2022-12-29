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

async function sqlQuery(query) {
    const pool = await conn;
    const response = await pool.request().query(query);
    return response.recordset;
}

module.exports = sqlQuery;
