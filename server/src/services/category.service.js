const Category = require("../models/Category");
const statusType = require("../constants/statusType");

exports.create = async (name) => {
    await Category.create(name);

    return {
        type: statusType.success,
        message: "Create category successfully!",
        statusCode: 200,
    };
};

exports.getDetail = async (id) => {
    const categories = await Category.getDetail(id);

    if (categories.length < 1)
        return {
            type: statusType.error,
            message: "No category found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Get category detail!",
        statusCode: 200,
        category: categories[0],
    };
};

exports.getCategoryList = async () => {
    const categories = await Category.getCategoryList();

    if (categories.length < 1)
        return {
            type: statusType.error,
            message: "No category found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Get category list!",
        statusCode: 200,
        categories,
    };
};

exports.delete = async (id) => {
    await Category.delete(id);

    return {
        type: statusType.success,
        message: "Delete category successfully!",
        statusCode: 200,
    };
};