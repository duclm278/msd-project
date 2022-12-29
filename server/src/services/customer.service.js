const statusType = require("../constants/statusType");
const Customer = require("../models/Customer");

exports.createCustomer = async (body) => {
    const email = await Customer.checkEmailExisted(body);

    if (email.length > 0) {
        return {
            type: statusType.error,
            message: "Email is existed!",
            statusCode: 400,
        };
    }

    await Customer.create(body);
    
    return {
        type: statusType.success,
        message: "Create customer successfully!",
        statusCode: 200,
    };
};

exports.searchCustomersByName = async (name) => {
    const customers = await Customer.searchByName(name);

    if (customers.length < 1) {
        return {
            type: statusType.error,
            message: "Customer is not existed!",
            statusCode: 400,
        };
    }
    return {
        type: statusType.success,
        message: "Create customer successfully!",
        statusCode: 200,
        customers: customers,
    };
};

exports.getCustomerById = async (id) => {
    const customer = await Customer.getCustomerById(id);
    return {
        type: statusType.success,
        message: "Get customer detail successfully!",
        statusCode: 200,
        customer: customer[0],
    };
};