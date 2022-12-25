const sqlQuery = require("../database/connect");

class Customer {
    constructor(name, email, phone, point = null, rankId = null) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.point = point;
        this.rankId = rankId;
    }

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
            SELECT * FROM Customer
            WHERE name LIKE '%${name}%'
        `;
        const response = await sqlQuery(query);
        return response;
    }
}

module.exports = Customer;
