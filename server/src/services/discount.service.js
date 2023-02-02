const Discount = require("../models/Discount");
const statusType = require("../constants/statusType");

exports.generateDiscount = async (data) => {
    const discount = await Discount.create(data);

    return {
        type: statusType.success,
        message: "Discount generated!",
        statusCode: 200,
        discount,
    };
};

exports.getDiscountById = async (discountId) => {
    const discount = await Discount.getDiscountById(discountId);

    if (!discount)
        return {
            type: statusType.error,
            message: "No discount found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Discount found!",
        statusCode: 200,
        discount
    };
};
