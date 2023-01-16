const sqlQuery = require("../database/connect");

class Event {
    async create(data) {
        const query = `
            INSERT INTO Event (event_name, description, event_status, poster, poster_id, begin_time, end_time)
            VALUES ('${data.name}', '${data.description}', '${data.status}', '${data.poster}', '${data.posterId}', '${data.beginTime}', '${data.endTime}')
            RETURNING *
        `;

        const response = await sqlQuery(query);
        return response;
    }

    async getEventById(id) {
        const query = `
            SELECT * FROM Event
            WHERE event_id = ${id}
        `;

        const response = await sqlQuery(query);
        return response[0];
    }

    async update(id, data) {
        let query = `
            UPDATE Event
            SET
        `;
        if (data.name) {
            query += `event_name = '${data.name}',`;
        }
        if (data.description) {
            query += `description = '${data.description}',`;
        }
        if (data.status) {
            query += `event_status = '${data.status}',`;
        }
        if (data.poster) {
            query += `poster = '${data.poster}',`;
        }
        if (data.posterId) {
            query += `poster_id = '${data.posterId}',`;
        }
        if (data.beginTime) {
            query += `begin_time = '${data.beginTime}',`;
        }
        if (data.endTime) {
            query += `end_time = '${data.endTime}',`;
        }
        query = query.substring(0, query.length - 1);

        query += ` 
            WHERE event_id = ${id}
            RETURNING *
        `;

        const response = await sqlQuery(query);

        return response[0];
    }

    async delete(id) {
        const query = `
            DELETE FROM Event
            WHERE event_id = ${id}
        `;

        await sqlQuery(query);
    }
}

module.exports = new Event();
