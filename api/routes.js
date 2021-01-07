const { Router } = require("express");
const getTask = require("./controller");
const validateGetTask = require("./validate");

const router = Router();

router.post("/tasks", validateGetTask, getTask);

module.exports = router;
