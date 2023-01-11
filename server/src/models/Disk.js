const sqlQuery = require("../database/connect");

class Disk {
    async create(data, image) {
        const query = `
            INSERT INTO Disk (disk_name, description, disk_status, price, image, category_id)
            VALUES ('${data.name}', '${data.description}', '${data.status}', ${data.price}, '${image}', ${data.categoryId})
        `;

        await sqlQuery(query);
    }

    async get() {
        const query = `
            SELECT * FROM Disk
        `;

        return await sqlQuery(query);
    }
}

module.exports = new Disk();
