const statusType = require("../constants/statusType");
const Employee = require("../models/Employee");

exports.createEmployee = async (body) => {
    const email = await Employee.checkEmailExisted(body);

    if (email.length > 0) {
        return {
            type: statusType.error,
            message: "Email is existed!",
            statusCode: 400,
        };
    }

    const employee = await Employee.create(body);

    return {
        type: statusType.success,
        message: "Create employee successfully!",
        statusCode: 200,
        employee,
    };
};

exports.getEmployeeById = async (id) => {
    const employees = await Employee.getEmployeeById(id);

    if (employees.length < 1) {
        return {
            type: statusType.error,
            message: "Employee not found!",
            statusCode: 400,
        };
    }

    return {
        type: statusType.success,
        message: "Get employee detail successfully!",
        statusCode: 200,
        employee: employees[0],
    };
};

exports.deleteEmployee = async (id) => {
    await Employee.deleteEmployeeById(id);

    return {
        type: statusType.success,
        message: "Delete employee successfully!",
        statusCode: 200,
    };
};

exports.updateEmployee = async (id, body) => {
    const employee = await Employee.updateEmployeeById(id, body);

    if (!employee)
        return {
            type: statusType.error,
            message: "No employee found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Update employee successfully!",
        statusCode: 200,
        employee,
    };
};
