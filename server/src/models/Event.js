const sqlQuery = require("../database/connect");

class Event {
    async create(data) {
        const query = `
            INSERT INTO Event (event_name, description, event_status, poster, poster_id, begin_time, end_time, discount, min_cost)
            VALUES ('${data.name}', '${data.description}', '${data.status}', '${data.poster}', '${data.posterId}', '${data.beginTime}', '${data.endTime}', ${data.discount}, ${data.minCost})
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
        const query = `
            UPDATE Event
            SET
                event_name = '${data.name}',
                description = '${data.description}',
                event_status = '${data.status}',
                poster = '${data.poster}',
                poster_id = '${data.posterId}',
                begin_time = '${data.beginTime}',
                end_time = '${data.endTime}',
                discount = '${data.discount}',
                min_cost = '${data.minCost}'
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

    async search(name, price = Number.MAX_SAFE_INTEGER) {
        const query = `
            SELECT * FROM Event
            WHERE lower(event_name) like lower('%${name.trim()}%') and min_cost <= ${price}
        `;
        return await sqlQuery(query);
    }
}

module.exports = new Event();
