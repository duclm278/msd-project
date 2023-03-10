const sqlQuery = require("../database/connect");

class Combo {
    async create(name, description = "", price, image, imageId) {
        const query = `
            INSERT INTO Combo (combo_name, combo_price, description, image, image_id)
            values ('${name}', ${price}, '${description}', '${image}', '${imageId}')
            returning *
        `;

        return (await sqlQuery(query))[0];
    }

    async insertDiskIntoCombo(comboId, diskId, quantity) {
        const query = `
            INSERT INTO DiskInCombo (combo_id, disk_id, quantity)
            values (${comboId}, ${diskId}, ${quantity})
        `;

        await sqlQuery(query);
    }

    async removeDiskInCombo(comboId) {
        const query = `
            DELETE FROM DiskInCombo 
            WHERE combo_id = ${comboId}
        `;

        await sqlQuery(query);
    }

    async getComboById(comboId) {
        const query = `
            SELECT *
            from Combo
            where combo_id = ${comboId}
        `;
        return (await sqlQuery(query))[0];
    }

    async getDiskInComboById(comboId) {
        const query = `
            SELECT D.*, DIC.quantity
            from Disk D
            inner join DiskInCombo DIC
                on D.disk_id = DIC.disk_id
            where DIC.combo_id = ${comboId}
        `;

        return await sqlQuery(query);
    }

    async delete(comboId) {
        const query = `
            DELETE FROM DiskInCombo
            where combo_id = ${comboId};

            DELETE FROM Combo
            where combo_id = ${comboId};
        `;

        await sqlQuery(query);
    }

    async searchByName(name) {
        const query = `
            SELECT * FROM Combo
            WHERE lower(combo_name) like lower('%${name.trim()}%')
        `;

        return await sqlQuery(query);
    }

    async getComboList() {
        const query = `
            SELECT * FROM Combo
        `;

        return await sqlQuery(query);
    }

    async update(id, data) {
        const query = `
            UPDATE Combo 
            SET 
                combo_name = '${data.name}',
                description = '${data.description}',
                combo_price = ${data.price},
                image = '${data.image}',
                image_id = '${data.imageId}'
            WHERE combo_id = ${id};
        `;

        await sqlQuery(query);
    }
}

module.exports = new Combo();
