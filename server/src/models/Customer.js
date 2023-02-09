const sqlQuery = require("../database/connect");

class Customer {
    async checkEmailExisted({ email }) {
        const query = `
            SELECT * FROM Customer
            WHERE email = '${email}'
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async create(data) {
        let query;

        if (data.email)
            query = `
                INSERT INTO Customer (name, email, phone, point, rank_id)
                VALUES ('${data.name}', '${data.email}', '${data.phone}', ${data.point}, ${data.rankId})
                RETURNING *
            `;
        else {
            query = `
                INSERT INTO Customer (name, phone, point, rank_id)
                VALUES ('${data.name}', '${data.phone}', ${data.point}, ${data.rankId})
                RETURNING *
            `;
        }
        const response = await sqlQuery(query);
        return response[0];
    }

    async search({ name, rank }) {
        let query;

        if (rank) {
            query = `
                SELECT C.customer_id id, C.email, C.name, C.phone, C.point, R.rank
                FROM Customer C
                inner join Rank R
                    on C.rank_id = R.rank_id
                WHERE lower(C.name) LIKE lower('%${name}%') and C.rank_id = ${rank}
            `;
        } else {
            query = `
                SELECT C.customer_id id, C.email, C.name, C.phone, C.point, R.rank
                FROM Customer C
                inner join Rank R
                    on C.rank_id = R.rank_id
                WHERE lower(C.name) LIKE lower('%${name}%')
            `;
        }
        const response = await sqlQuery(query);
        return response;
    }

    async getCustomerById(id) {
        const query = `
            SELECT * FROM Customer
            WHERE customer_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response[0];
    }

    async deleteCustomerById(id) {
        const query = `
            DELETE FROM Customer
            WHERE customer_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async updateCustomerById(id, data) {
        console.log(data);
        const query = `
            UPDATE Customer
            SET
                name = '${data.name}',
                email = '${data.email}',
                phone = '${data.phone}',
                point = ${data.point},
                rank_id = ${data.rankId}
            WHERE customer_id = ${id}
            RETURNING *
        `;

        const response = await sqlQuery(query);
        return response[0];
    }
}

module.exports = new Customer();
