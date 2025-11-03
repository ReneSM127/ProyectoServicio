const express = require("express");
const router = express.Router();
const fetchUser = require("../Middlewares/fetchUser");
const { createOrder } = require("../Controllers/orderController");

router.post("/create", fetchUser, createOrder);

module.exports = router;