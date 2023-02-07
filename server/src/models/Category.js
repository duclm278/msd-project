const sqlQuery = require("../database/connect");

class Category {
    async create(name) {
        const query = `
            INSERT INTO Category (category_name)
            VALUES ('${name}')
        `;

        await sqlQuery(query);
    }

    async getCategoryList() {
        const query = `
            SELECT * FROM Category
        `;

        return await sqlQuery(query);
    }

    async getDetail(id) {
        const query = `
            SELECT * FROM Category
            WHERE category_id = ${id}
        `;

        return await sqlQuery(query);
    }

    async delete(id) {
        const query = `
            DELETE FROM Category
            WHERE category_id = ${id}
        `;

        await sqlQuery(query);
    }

    async checkId(name) {
        const query = `
            SELECT category_id FROM Category
            WHERE lower(category_name) like lower('%${name}%')
        `;

        return (await sqlQuery(query))[0].category_id;
    }
}

module.exports = new Category();
