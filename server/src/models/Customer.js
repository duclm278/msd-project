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
        const query = `
            INSERT INTO Customer (name, email, phone)
            VALUES ('${data.name}', '${data.email}', '${data.phone}')
            RETURNING *
        `;
        const response = await sqlQuery(query);
        return response[0];
    }

    async search({ name, rank }) {
        let query;

        if (rank) {
            query = `
            SELECT customer_id, name 
            FROM Customer C
            WHERE lower(C.name) LIKE lower('%${name}%') and rank_id = ${rank}
        `;
        } else {
            query = `
                SELECT customer_id, name 
                FROM Customer C
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
        let query = `
            UPDATE Customer
            SET
        `;
        if (data.name) {
            query += `name = '${data.name}',`;
        }
        if (data.email) {
            query += `email = '${data.email}',`;
        }
        if (data.phone) {
            query += `phone = '${data.phone}',`;
        }
        if (data.point) {
            query += `point = ${data.point},`;
        }
        if (data.rank_id) {
            query += `rank_id = ${data.rank_id},`;
        }

        query = query.substring(0, query.length - 1);
        query += ` 
            WHERE customer_id = ${id}
            RETURNING *
        `;

        const response = await sqlQuery(query);
        return response[0];
    }
}

module.exports = new Customer();
