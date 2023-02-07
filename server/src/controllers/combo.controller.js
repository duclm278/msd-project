const statusType = require("../constants/statusType");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const comboService = require("../services/combo.service");

exports.createCombo = async (req, res, next) => {
    try {
        const { type, message, statusCode, combo } =
            await comboService.createCombo(req.body, req.file);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            combo,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteCombo = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await comboService.deleteCombo(
            req.params.comboId
        );

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
        });
    } catch (err) {
        next(err);
    }
};

exports.searchByName = async (req, res, next) => {
    try {
        const { type, message, statusCode, combos } =
            await comboService.searchByName(req.query.name);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            combos,
        });
    } catch (err) {
        next(err);
    }
};

exports.getComboList = async (req, res, next) => {
    try {
        const { type, message, statusCode, combos } =
            await comboService.getComboList();

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            combos,
        });
    } catch (err) {
        next(err);
    }
};

exports.getComboDetail = async (req, res, next) => {
    try {
        const { type, message, statusCode, combo } =
            await comboService.getComboDetail(req.params.comboId);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            combo,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateCombo = async (req, res, next) => {
    try {
        const { type, message, statusCode, combo } =
            await comboService.updateCombo(
                req.params.comboId,
                req.body,
                req.file
            );

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            combo,
        });
    } catch (err) {
        next(err);
    }
};
