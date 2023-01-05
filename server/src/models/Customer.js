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
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async searchByName(name) {
        const query = `
            SELECT customer_id, name FROM Customer
            WHERE name LIKE '%${name}%'
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async getCustomerById(id) {
        const query = `
            SELECT * FROM Customer
            WHERE customer_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async deleteCustomerById(id) {
        const query = `
            DELETE FROM Customer
            WHERE customer_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async updateCustomerById(id, body) {
        let query = `
            UPDATE Customer
            SET
        `;
        if (body.name) {
            query += `name = '${body.name}',`;
        }
        if (body.email) {
            query += `email = '${body.email}',`;
        }
        if (body.phone) {
            query += `phone = '${body.phone}',`;
        }
        if (body.point) {
            query += `point = ${body.point},`;
        }
        if (body.rank_id) {
            query += `rank_id = ${body.rank_id},`;
        }

        query = query.substring(0, query.length - 1);
        query += ` WHERE customer_id = ${id}`;
        
        const response = await sqlQuery(query);
        return response;
    }
}

module.exports = new Customer();
