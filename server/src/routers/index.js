const express = require("express");
const customerRouter = require("./customer.route");
const employeeRouter = require("./employee.route");
const tableRouter = require("./table.route");
const diskRouter = require("./disk.route");
const categoryRouter = require("./category.route");
const router = express.Router();

router.use("/customer", customerRouter);
router.use("/employee", employeeRouter);
router.use("/table", tableRouter);
router.use("/disk", diskRouter);
router.use("/category", categoryRouter);

module.exports = router;
