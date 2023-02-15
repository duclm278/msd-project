const orderService = require("../services/order.service");
const statusType = require("../constants/statusType");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.createOrder = async (req, res, next) => {
    try {
        const { type, message, statusCode, order } =
            await orderService.createOrder(req.body);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            order,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await orderService.deleteOrder(
            req.params.orderId
        );

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateOrder = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await orderService.updateOrder(
            req.params.orderId,
            req.body
        );

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateCost = async (req, res, next) => {
    try {
        const { type, message, statusCode, order } =
            await orderService.updateCost(req.params.orderId, req.body.cost);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            order,
        });
    } catch (err) {
        next(err);
    }
};

exports.searchOrder = async (req, res, next) => {
    try {
        const { type, message, statusCode, orders } =
            await orderService.getListOrder(req.query.name);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            orders,
        });
    } catch (err) {
        next(err);
    }
};
