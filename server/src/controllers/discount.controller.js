const statusType = require("../constants/statusType");
const discountService = require("../services/discount.service");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.generateDiscount = async (req, res, next) => {
    try {
        const { type, message, statusCode, discount } =
            await discountService.generateDiscount(req.body);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            discount,
        });
    } catch (err) {
        next(err);
    }
};

exports.getDiscountById = async (req, res, next) => {
    try {
        const { type, message, statusCode, discount } =
            await discountService.getDiscountById(req.params.discountId);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        res.status(statusCode).json({
            type,
            message,
            discount,
        });
    } catch (err) {
        next(err);
    }
};
