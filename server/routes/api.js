const express = require("express");
const router = express.Router();
const taskRouter = require("../routes/tasks");

router.use("/v1/tasks", taskRouter);

module.exports = router;
