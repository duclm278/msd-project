const sql = require("mssql/msnodesqlv8");

const config = {
    server: "localhost",
    user: "sa",
    password: "251209",
    database: "Restaurant",
    port: 1433,
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
    return pool;
});

module.exports = {
    conn,
    sql,
};
