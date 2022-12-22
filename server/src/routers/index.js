const express = require("express");
const customerRouter = require("./customer.route");
const router = express.Router();

router.use("/customer", customerRouter);

module.exports = router;
