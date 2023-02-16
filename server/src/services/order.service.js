const statusType = require("../constants/statusType");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const moment = require("moment");
const Disk = require("../models/Disk");
const Combo = require("../models/Combo");
const Table = require("../models/Table");

exports.createOrder = async (data) => {
    if (data.customerId) {
        const customer = await Customer.getCustomerById(data.customerId);

        if (!customer) {
            return {
                type: statusType.error,
                message: "No customer found!",
                statusCode: 404,
            };
        }

        data.customerName = customer.name;
        data.phone = customer.phone;
    }

    const table = await Table.checkTableIdExisted(data.tableId);

    if (!table)
        return {
            type: statusType.error,
            message: "Table not found!",
            statusCode: 404,
        };

    if (!data.reservedTime) {
        data.reservedTime = moment().format("YYYY-MM-DD HH:mm:ss");
    } else {
        data.reservedTime = moment(data.reservedTime).format(
            "YYYY-MM-DD HH:mm:ss"
        );
    }

    for (let disk of data.disks) {
        const diskDoc = await Disk.getById(disk.id);

        if (!diskDoc)
            return {
                type: statusType.error,
                message: `Disk with id ${disk.id} not found!`,
                statusCode: 404,
            };
    }

    for (let combo of data.combos) {
        const comboDoc = await Combo.getComboById(combo.id);

        if (!comboDoc)
            return {
                type: statusType.error,
                message: `Combo with id ${combo.id} not found!`,
                statusCode: 404,
            };
    }
    const order = await Order.create(data);

    if (data.disks) {
        for (let disk of data.disks) {
            await Order.insertDisk(order.order_id, disk.id, disk.quantity);
        }
    }

    if (data.combos) {
        for (let combo of data.combos) {
            await Order.insertCombo(order.order_id, combo.id, combo.quantity);
        }
    }

    return {
        type: statusType.success,
        message: "Order created!",
        statusCode: 200,
        order,
    };
};

exports.deleteOrder = async (orderId) => {
    const order = await Order.getOrderById(orderId);

    if (!order)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };

    await Order.deleteDisk(orderId);
    await Order.deleteCombo(orderId);
    await Order.delete(orderId);

    return {
        type: statusType.success,
        message: "Order deleted!",
        statusCode: 200,
    };
};

exports.updateOrder = async (id, data) => {
    const order = await Order.getOrderById(id);

    if (!order)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };

    const table = await Table.checkTableIdExisted(data.tableId);

    if (!table)
        return {
            type: statusType.error,
            message: "Table not found!",
            statusCode: 404,
        };

    for (let disk of data.disks) {
        const diskDoc = await Disk.getById(disk.id);

        if (!diskDoc)
            return {
                type: statusType.error,
                message: `Disk with id ${disk.id} not found!`,
                statusCode: 404,
            };
    }

    for (let combo of data.combos) {
        const comboDoc = await Combo.getComboById(combo.id);

        if (!comboDoc)
            return {
                type: statusType.error,
                message: `Combo with id ${combo.id} not found!`,
                statusCode: 404,
            };
    }

    if (data.customerId) {
        const customer = await Customer.getCustomerById(data.customerId);

        if (!customer) {
            return {
                type: statusType.error,
                message: "No customer found!",
                statusCode: 404,
            };
        }

        data.customerName = customer.name;
        data.phone = customer.phone;
    }
    console.log(data);
    await Order.updateOrder(id, data);

    if (data.disks) {
        await Order.deleteDisk(id);

        for (let disk of data.disks) {
            await Order.insertDisk(id, disk.id, disk.quantity);
        }
    }

    if (data.combos) {
        await Order.deleteCombo(id);

        for (let combo of data.combos) {
            await Order.insertCombo(id, combo.id, combo.quantity);
        }
    }

    return {
        type: statusType.success,
        message: `Order ${id} updated!`,
        statusCode: 200,
    };
};

exports.updateCost = async (id, cost) => {
    const order = await Order.getOrderById(id);

    if (!order)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };

    const updatedOrder = await Order.updateTotalCost(id, cost);

    return {
        type: statusType.success,
        message: "Order created!",
        statusCode: 200,
        order: updatedOrder,
    };
};

exports.getOrderById = async (id) => {
    const order = await Order.getOrderById(id);

    if (!order)
        return {
            type: statusType.error,
            message: "Order not found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Order found!",
        statusCode: 200,
        order,
    };
};

exports.getListOrder = async (search, date) => {
    const orders = await Order.search(search, date);

    if (orders.length < 1)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Order found!",
        statusCode: 200,
        orders,
    };
};

exports.getCombosAndDisks = async (orderId) => {
    const order = await Order.getOrderById(orderId);

    if (!order)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };
    return {
        type: statusType.success,
        message: "Get combo and disk!",
        statusCode: 200,
        disks: await Order.getDisksInOrder(orderId),
        combos: await Order.getCombosInOrder(orderId),
    };
};

exports.getStatistic = async (data) => {
    const orders = await Order.getStatistic(data.beginDate, data.endDate);
    if (orders.length < 1)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };
    return {
        type: statusType.success,
        message: "Order found!",
        statusCode: 200,
        orders,
    };
};

exports.getOrdersBetweenDate = async (data) => {
    const orders = await Order.getOrderBetweenDate(
        data.beginDate,
        data.endDate
    );
    if (orders.length < 1)
        return {
            type: statusType.error,
            message: "No order found!",
            statusCode: 404,
        };
    return {
        type: statusType.success,
        message: "Order found!",
        statusCode: 200,
        orders,
    };
};
