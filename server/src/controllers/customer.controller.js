const statusType = require("../constants/statusType");
const customerService = require("../services/customer.service");
const CustomerErrorHandler = require("../middlewares/CustomerErrorHandler");

exports.createCustomer = async (req, res, next) => {
    try {
        const { type, message, statusCode } =
            await customerService.createCustomer(req.body);

        if (type === statusType.error)
            return next(new CustomerErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
        });
    } catch (err) {
        next(err);
    }
};

exports.searchCustomersByName = async (req, res, next) => {
    try {
        const { type, message, statusCode, customers } =
            await customerService.searchCustomersByName(req.query.name);
        if (type === statusType.error)
            return next(new CustomerErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            customers,
        });
    } catch (err) {
        next(err);
    }
};

exports.getCustomerById = async (req, res, next) => {
    try {
        const { type, message, statusCode, customer } =
            await customerService.getCustomerById(req.params.id);
        if (type === statusType.error)
            return next(new CustomerErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            customer,
        });
    } catch (err) {
        next(err);
    }
};
