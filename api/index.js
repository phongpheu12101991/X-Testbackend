const express = require("express");

const authRouter = require("./auth");
const dataRouter = require("./data");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/data", dataRouter);

module.exports = router;
