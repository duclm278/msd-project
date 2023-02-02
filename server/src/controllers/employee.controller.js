const statusType = require("../constants/statusType");
const employeeService = require("../services/Employee.service");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");

exports.login = async (req, res, next) => {
    try {
        const { type, message, statusCode } =
            await employeeService.employeeLogin(
                req.body.email,
                req.body.password
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

exports.createEmployee = async (req, res, next) => {
    try {
        const { type, message, statusCode, employee } =
            await employeeService.createEmployee(req.body);

        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            employee,
        });
    } catch (err) {
        next(err);
    }
};

exports.getEmployeeById = async (req, res, next) => {
    try {
        const { type, message, statusCode, employee } =
            await employeeService.getEmployeeById(req.params.id);
        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            employee,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const { type, message, statusCode } =
            await employeeService.deleteEmployee(req.params.id);
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

exports.updateEmployee = async (req, res, next) => {
    try {
        const { type, message, statusCode, employee } =
            await employeeService.updateEmployee(req.params.id, req.body);
        if (type === statusType.error)
            return next(new CustomErrorHandler(statusCode, message));

        return res.status(statusCode).json({
            type,
            message,
            employee,
        });
    } catch (err) {
        next(err);
    }
};
