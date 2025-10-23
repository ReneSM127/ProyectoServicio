const express = require("express");
const router = express.Router();
const fetchUser = require("../Middlewares/fetchUser");
const { addToCart, removeFromCart, getCart } = require("../Controllers/cartController");

router.post("/add", fetchUser, addToCart);
router.post("/remove", fetchUser, removeFromCart);
router.post("/get", fetchUser, getCart);

module.exports = router;
