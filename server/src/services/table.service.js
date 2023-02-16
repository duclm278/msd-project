const statusType = require("../constants/statusType");
const Table = require("../models/Table");

exports.createTable = async (id, numberOfSeats, tableStatus) => {
    const table = await Table.checkTableIdExisted(id);
    if (table)
        return {
            type: statusType.error,
            message: "Table existed!",
            statusCode: 400,
        };

    const newTable = await Table.create(id, numberOfSeats, tableStatus);

    return {
        type: statusType.success,
        message: "Create table successfully!",
        statusCode: 200,
        table: newTable,
    };
};

exports.getTableList = async () => {
    const tables = await Table.getTableList();
    if (tables.length < 1)
        return {
            type: statusType.error,
            message: "Table existed!",
            statusCode: 400,
        };

    return {
        type: statusType.success,
        message: "Create table successfully!",
        statusCode: 200,
        tables: tables,
    };
};

exports.updateTable = async (id, body) => {
    const table = await Table.checkTableIdExisted(id);

    if (!table)
        return {
            type: statusType.error,
            message: "No table found!",
            statusCode: 404,
        };

    const newTable = await Table.update(id, body);

    return {
        type: statusType.success,
        message: "Update table successfully!",
        statusCode: 200,
        table: newTable,
    };
};

exports.getTableDetail = async (id) => {
    const table = await Table.checkTableIdExisted(id);

    if (!table)
        return {
            type: statusType.error,
            message: "No table found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Get table detail!",
        statusCode: 200,
        table,
    };
};

exports.deleteTable = async (id) => {
    const table = await Table.checkTableIdExisted(id);

    if (!table)
        return {
            type: statusType.error,
            message: "No table found!",
            statusCode: 404,
        };

    await Table.delete(id);

    return {
        type: statusType.success,
        message: "Delete table successfully!",
        statusCode: 200,
    };
};
