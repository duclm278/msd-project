const statusType = require("../constants/statusType");
const Customer = require("../models/Customer");

exports.createCustomer = async (body) => {
    const customer = new Customer();

    const email = await customer.checkEmailExisted(body);

    if(email.recordset.length > 0){
        return {
            type: statusType.error,
            message: "Email is existed!",
            statusCode: 400,
        };
    };

    const response = await customer.create(body);
    console.log(response);
    return {
        type: statusType.success,
        message: "Create customer successfully!",
        statusCode: 200,
    };
};
