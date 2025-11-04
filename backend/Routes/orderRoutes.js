const express = require("express");
const router = express.Router();
const fetchUser = require("../Middlewares/fetchUser");
const { createOrder, getMyOrders } = require("../Controllers/orderController");

router.post("/create", fetchUser, createOrder);
router.get("/myorders", fetchUser, getMyOrders);

module.exports = router;