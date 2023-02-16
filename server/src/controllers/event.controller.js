const eventService = require("../services/event.service");
const statusType = require("../constants/statusType");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.createEvent = async (req, res, next) => {
    try {
        const { type, message, statusCode, event } =
            await eventService.createEvent(req.body, req.file);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            event,
        });
    } catch (err) {
        next(err);
    }
};

exports.searchEvent = async (req, res, next) => {
    try {
        const { type, message, statusCode, events } =
            await eventService.searchEvent(req.query.name, req.query.price);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            events,
        });
    } catch (err) {
        next(err);
    }
};

exports.getEventById = async (req, res, next) => {
    try {
        const { type, message, statusCode, event } =
            await eventService.getEventById(req.params.id);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            event,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const { type, message, statusCode, event } =
            await eventService.updateEvent(req.params.id, req.body, req.file);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            event,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await eventService.deleteEvent(
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
