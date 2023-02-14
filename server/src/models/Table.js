const sqlQuery = require("../database/connect");

class Table {
    async checkTableIdExisted(id) {
        const query = `
            SELECT * FROM "Table"
            WHERE table_id = ${id}
        `;

        const response = await sqlQuery(query);
        return response[0];
    }

    async getTableList() {
        const query = `
            SELECT * FROM "Table"
            ORDER BY table_id
        `;

        const response = await sqlQuery(query);
        return response;
    }

    async create(id, numberOfSeats, tableStatus) {
        const query = `
            INSERT INTO "Table" (table_id, number_of_seats, table_status)
            VALUES (${id}, ${numberOfSeats}, '${tableStatus}')
            RETURNING *;
        `;

        return (await sqlQuery(query))[0];
    }

    async update(id, body) {
        let query = `
            UPDATE "Table"
            SET 
                number_of_seats = '${body.numberOfSeats}',
                table_status = '${body.tableStatus}'
            WHERE table_id = ${id}
            RETURNING *
        `;

        const response = await sqlQuery(query);
        return response[0];
    }

    async delete(id) {
        const query = `
            DELETE FROM "Table"
            WHERE table_id = ${id}
        `;

        await sqlQuery(query);
    }
}

module.exports = new Table();
