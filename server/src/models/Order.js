const sqlQuery = require("../database/connect");

class Order {
    async create(data) {
        if (data.eventId) {
            const query = `
                INSERT INTO "Order" (customer_id, customer_name, table_id, reserved_time, total_cost, phone, status, event_id)
                values (${data.customerId}, '${data.customerName}', ${data.tableId}, '${data.reservedTime}', 0, ${data.totalCost}, ${data.eventId})
                returning *
            `;

            return (await sqlQuery(query))[0];
        } else {
            const query = `
                INSERT INTO "Order" (customer_id, customer_name, table_id, reserved_time, total_cost, phone, status)
                values (${data.customerId}, '${data.customerName}', ${data.tableId}, '${data.reservedTime}', ${data.totalCost}, '${data.phone}')
                returning *
            `;

            return (await sqlQuery(query))[0];
        }
    }

    async delete(orderId) {
        const query = `
            DELETE FROM "Order"
            WHERE order_id = ${orderId}
        `;

        await sqlQuery(query);
    }

    async getOrderById(orderId) {
        const query = `
            SELECT * FROM "Order"
            WHERE order_id = ${orderId}
        `;

        return (await sqlQuery(query))[0];
    }

    async insertDisk(orderId, diskId, quantity) {
        const query = `
            INSERT INTO DiskInOrder (order_id, disk_id, quantity)
            VALUES (${orderId}, ${diskId}, ${quantity})
        `;

        await sqlQuery(query);
    }

    async insertCombo(orderId, comboId, quantity) {
        const query = `
            INSERT INTO ComboInOrder (order_id, combo_id, quantity)
            VALUES (${orderId}, ${comboId}, ${quantity})
        `;

        await sqlQuery(query);
    }

    async deleteDisk(orderId) {
        const query = `
            DELETE FROM DiskInOrder
            WHERE order_id = ${orderId}
        `;

        await sqlQuery(query);
    }

    async deleteCombo(orderId) {
        const query = `
            DELETE FROM ComboInOrder
            WHERE order_id = ${orderId}
        `;

        await sqlQuery(query);
    }

    async calculateTotalCost(orderId) {
        const q1 = `
            SELECT SUM(price * DIO.quantity)
            FROM Disk D
            inner join DiskInOrder DIO
                on D.disk_id = DIO.disk_id
            WHERE DIO.order_id = ${orderId}
        `;

        const diskCost = (await sqlQuery(q1))[0].sum;

        const q2 = `
            SELECT SUM(combo_price * CIO.quantity)
            FROM Combo C
            inner join ComboInOrder CIO
                on C.combo_id = CIO.combo_id
            WHERE CIO.order_id = ${orderId}
        `;

        const comboCost = (await sqlQuery(q2))[0].sum;

        const updateOrderCost = `
            UPDATE "Order"
            SET total_cost = ${diskCost + comboCost}
            WHERE order_id = ${orderId}
        `;

        await sqlQuery(updateOrderCost);
    }

    async updateTotalCost(orderId, cost) {
        const query = `
            UPDATE "Order"
            SET total_cost = ${cost}
            WHERE order_id = ${orderId}
            returning *
        `;
        return (await sqlQuery(query))[0];
    }

    async search(searchData) {
        let query = `
            SELECT * FROM "Order"
            WHERE 
                lower(customer_name) like lower('%${searchData}%') 
            or  lower(phone) like lower('%${searchData}%')
        `;
        return await sqlQuery(query);
    }
}

module.exports = new Order();
