const statusType = require("../constants/statusType");

module.exports = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Interval server error!";

    return res.status(errorStatus).json({
        type: statusType.error,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack.split("    "),
    });
};
