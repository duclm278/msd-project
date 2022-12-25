const statusType = require("../constants/statusType");
const Customer = require("../models/Customer");

exports.createCustomer = async (body) => {
    const customer = new Customer();

    const email = await customer.checkEmailExisted(body);

    if (email.recordset.length > 0) {
        return {
            type: statusType.error,
            message: "Email is existed!",
            statusCode: 400,
        };
    }

    const response = await customer.create(body);
    return {
        type: statusType.success,
        message: "Create customer successfully!",
        statusCode: 200,
    };
};

exports.searchCustomersByName = async (name) => {
    const customer = new Customer();

    const response = await customer.searchByName(name);

    if (response.recordset.length < 1) {
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
        customers: response.recordset,
    };
};
