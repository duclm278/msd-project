const statusType = require("../constants/statusType");
const Table = require("../models/Table");

exports.createTable = async (id, numberOfSeats) => {
    const table = await Table.checkTableIdExisted(id);
    if (table.length > 0)
        return {
            type: statusType.error,
            message: "Table existed!",
            statusCode: 400,
        };

    const newTable = await Table.create(id, numberOfSeats);

    return {
        type: statusType.success,
        message: "Create table successfully!",
        statusCode: 200,
        table: newTable,
    };
};

exports.updateTable = async (id, body) => {
    const table = await Table.checkTableIdExisted(id);

    if (table.length < 1)
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
    const tables = await Table.checkTableIdExisted(id);

    if (tables.length < 1)
        return {
            type: statusType.error,
            message: "No table found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Get table detail!",
        statusCode: 200,
        table: tables[0],
    };
};

exports.deleteTable = async (id) => {
    const tables = await Table.checkTableIdExisted(id);

    if (tables.length < 1)
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
