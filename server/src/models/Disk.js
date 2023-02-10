const sqlQuery = require("../database/connect");

class Disk {
    async create(data, image, image_id) {
        const query = `
            INSERT INTO Disk (disk_name, description, price, image, image_id, category_id)
            VALUES ('${data.name}', '${data.description}', ${data.price}, '${image}', '${image_id}', ${data.categoryId})
            RETURNING *
        `;
        return (await sqlQuery(query))[0];
    }

    async get() {
        const query = `
            SELECT D.*, C.category_name
            FROM Disk D
            inner join Category C
                on D.category_id = C.category_id
        `;
        return await sqlQuery(query);
    }

    async getById(id) {
        const query = `
            SELECT * FROM Disk
            WHERE disk_id = ${id}
        `;
        return (await sqlQuery(query))[0];
    }

    async searchByName(name) {
        const query = `
            SELECT * FROM Disk
            WHERE lower(disk_name) like lower('%${name}%')
        `;

        return await sqlQuery(query);
    }

    async delete(id) {
        const query = `
            DELETE FROM Disk
            where disk_id = ${id}
        `;
        await sqlQuery(query);
    }

    async checkExistedInCombo(id) {
        const query = `
            SELECT C.combo_name 
            FROM DiskInCombo D
            INNER JOIN Combo C
                ON D.combo_id = C.combo_id
            WHERE D.disk_id = ${id}
        `;
        return (await sqlQuery(query))[0];
    }

    async update(id, data) {
        let query = `
            UPDATE Disk
            SET
        `;
        if (data.name) {
            query += `disk_name = '${data.name}',`;
        }
        if (data.description) {
            query += `description = '${data.description}',`;
        }
        if (data.price) {
            query += `price = ${data.price},`;
        }
        if (data.image) {
            query += `image = '${data.image}',`;
        }
        if (data.imageId) {
            query += `image_id = '${data.imageId}',`;
        }
        if (data.categoryId) {
            query += `category_id = ${data.categoryId},`;
        }

        query = query.substring(0, query.length - 1);
        query += ` 
            WHERE disk_id = ${id}
            RETURNING *
        `;
        const response = await sqlQuery(query);
        return response[0];
    }
}

module.exports = new Disk();
