const sqlQuery = require("../database/connect");

class Employee {
    async checkEmailExisted({ email }) {
        const query = `
            SELECT * FROM Employee
            WHERE email = '${email}'
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async create(data) {
        const query = `
            INSERT INTO Employee (name, email, phone, address, password)
            VALUES ('${data.name}', '${data.email}', '${data.phone}', '${data.address}', '${data.password}')
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async getEmployeeById(id) {
        const query = `
            SELECT * FROM Employee
            WHERE employee_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async deleteEmployeeById(id) {
        const query = `
            DELETE FROM Employee
            WHERE employee_id = ${id}
        `;
        const response = await sqlQuery(query);
        return response;
    }

    async updateEmployeeById(id, body) {
        let query = `
            UPDATE Employee
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
        if (body.password) {
            query += `password = '${body.password}',`;
        }
        if (body.address) {
            query += `address = ${body.address},`;
        }

        query = query.substring(0, query.length - 1);
        query += ` WHERE employee_id = ${id}`;

        const response = await sqlQuery(query);
        return response;
    }
}

module.exports = new Employee();
