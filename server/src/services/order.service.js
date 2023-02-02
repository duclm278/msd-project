const statusType = require("../constants/statusType");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const moment = require("moment");
const Disk = require("../models/Disk");
const Combo = require("../models/Combo");

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

    if (!data.reservedTime) {
        data.reservedTime = moment().format("YYYY-MM-DD HH:mm:ss");
    } else {
        data.reservedTime = moment(data.reservedTime).format(
            "YYYY-MM-DD HH:mm:ss"
        );
    }

    const order = await Order.create(data);

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

    await Order.calculateTotalCost(id);

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