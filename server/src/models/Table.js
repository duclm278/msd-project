const sqlQuery = require("../database/connect");

class Table {
    async checkTableIdExisted(id) {
        const query = `
            SELECT * FROM "Table"
            WHERE table_id = ${id}
        `;

        const response = await sqlQuery(query);
        return response;
    }

    async create(id, numberOfSeats) {
        const query = `
            SET IDENTITY_INSERT "Table" ON; 

            INSERT INTO "Table" (table_id, number_of_seats)
            VALUES (${id}, ${numberOfSeats})
            RETURNING *;

            SET IDENTITY_INSERT "Table" OFF; 
        `;

        return (await sqlQuery(query))[0];
    }

    async update(id, body) {
        let query = `
            UPDATE "Table"
            SET
        `;
        if (body.numberOfSeats) {
            query += `number_of_seats = '${body.numberOfSeats}',`;
        }
        if (body.status) {
            query += `table_status = '${body.status}',`;
        }

        query = query.substring(0, query.length - 1);
        query += ` 
            WHERE table_id = ${id}
            RETURNING *    
        `;

        const response = await sqlQuery(query);
        return response[0];
    }

    async delete(id) {
        let query = `
            DELETE FROM "Table"
            WHERE table_id = ${id}
        `;

        await sqlQuery(query);
    }
}

module.exports = new Table();
