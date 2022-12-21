const { conn, sql } = require("./database/connect");

const express = require("express");
const app = express();

async function getData(app) {
    var pool = await conn;
    const response = await pool.request().query("select * from Customer");
    console.log(response.recordset);
}

getData(app);

app.listen(3000);
