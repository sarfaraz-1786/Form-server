const express = require("express");
const router = express.Router();

const crtlUser = require("./user.controller");

router.post("/register", crtlUser.register);

module.exports = router;
