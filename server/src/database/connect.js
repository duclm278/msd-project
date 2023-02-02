const config = require("../configs");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: config.db.username,
    host: config.db.host_server,
    database: config.db.database,
    password: config.db.password,
    port: config.db.db_port,
});

const sqlQuery = async (query) => {
    const response = await pool.query(query);
    // console.log(query);
    // console.log(response);
    return response.rows;
};

module.exports = sqlQuery;
