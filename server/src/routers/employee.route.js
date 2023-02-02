const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.post("/login", employeeController.login);

router.post("/create", employeeController.createEmployee);

router
    .route("/:id")
    .get(employeeController.getEmployeeById)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;
