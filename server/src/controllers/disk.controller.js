const diskService = require("../services/disk.service");
const statusType = require("../constants/statusType");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.createDisk = async (req, res, next) => {
    try {
        const { type, message, statusCode, disk } =
            await diskService.createDisk(req.body, req.file);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            disk,
        });
    } catch (err) {
        next(err);
    }
};

exports.getListOfDisk = async (req, res, next) => {
    try {
        const { type, message, statusCode, disks } =
            await diskService.getListOfDisks();

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            disks,
        });
    } catch (err) {
        next(err);
    }
};

exports.searchDisk = async (req, res, next) => {
    try {
        const { type, message, statusCode, disks } =
            await diskService.searchDisk(req.query.name);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            disks,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteDisk = async (req, res, next) => {
    try {
        const { type, statusCode, message } = await diskService.deleteDisk(
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

exports.updateDisk = async (req, res, next) => {
    try {
        const { type, statusCode, message, disk } =
            await diskService.updateDisk(req.params.id, req.body, req.file);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            disk,
        });
    } catch (err) {
        next(err);
    }
};