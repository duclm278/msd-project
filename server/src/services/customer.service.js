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

    const customer = await Customer.create(body);

    return {
        type: statusType.success,
        message: "Create customer successfully!",
        statusCode: 200,
        customer,
    };
};

exports.searchCustomersByNameOrRank = async (query) => {
    const customers = await Customer.search(query);

    if (customers.length < 1) {
        return {
            type: statusType.error,
            message: "Customer is not existed!",
            statusCode: 400,
        };
    }

    return {
        type: statusType.success,
        message: "Search customer successfully!",
        statusCode: 200,
        customers: customers,
    };
};

exports.getCustomerById = async (id) => {
    const customer = await Customer.getCustomerById(id);

    if (!customer) {
        return {
            type: statusType.error,
            message: "Customer not found!",
            statusCode: 400,
        };
    }

    return {
        type: statusType.success,
        message: "Get customer detail successfully!",
        statusCode: 200,
        customer: customer,
    };
};

exports.deleteCustomer = async (id) => {
    await Customer.deleteCustomerById(id);

    return {
        type: statusType.success,
        message: "Delete customer successfully!",
        statusCode: 200,
    };
};

exports.updateCustomer = async (id, body) => {
    const customer = await Customer.updateCustomerById(id, body);

    if (!customer)
        return {
            type: statusType.error,
            message: "No customer found!",
            statusCode: 200,
        };

    return {
        type: statusType.success,
        message: "Update customer successfully!",
        statusCode: 200,
        customer,
    };
};
