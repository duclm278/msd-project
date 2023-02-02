const sqlQuery = require("../database/connect");

class Discount {
    async create(data) {
        const query = `
            INSERT INTO Discount (event_id, discount, min_cost)
            VALUES (${data.eventId}, ${data.discount}, ${data.minCost})
            RETURNING *
        `;

        return (await sqlQuery(query))[0];
    }

    async getDiscountById(discountId) {
        const query = `
            SELECT * FROM Discount
            WHERE discount_id = ${discountId}
        `;

        return (await sqlQuery(query))[0];
    }
}

module.exports = new Discount();
