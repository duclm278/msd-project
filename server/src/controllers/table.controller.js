const statusType = require("../constants/statusType");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const tableService = require("../services/table.service");

exports.createTable = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await tableService.createTable(
            req.body.id,
            req.body.numberOfSeats
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

exports.updateTable = async (req, res, next) => {
    try {
        const { type, statusCode, message } = await tableService.updateTable(
            req.params.id,
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

exports.getTableDetail = async (req, res, next) => {
    try {
        const { type, statusCode, message, table } =
            await tableService.getTableDetail(req.params.id);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            table,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteTable = async (req, res, next) => {
    try {
        const { type, statusCode, message } = await tableService.deleteTable(
            req.params.id
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
