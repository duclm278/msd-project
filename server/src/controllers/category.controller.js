const statusType = require("../constants/statusType");
const categoryService = require("../services/category.service");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.create = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await categoryService.create(
            req.body.name
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

exports.getDetail = async (req, res, next) => {
    try {
        const { type, message, statusCode, category } =
            await categoryService.getDetail(req.params.id);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            category,
        });
    } catch (err) {
        next(err);
    }
};

exports.getCategoryList = async (req, res, next) => {
    try {
        const { type, message, statusCode, categories } =
            await categoryService.getCategoryList();

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            categories,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { type, message, statusCode } = await categoryService.delete(
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
