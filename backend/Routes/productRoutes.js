const express = require("express");
const router = express.Router();
const {
  addProduct,
  removeProduct,
  getAllProducts,
  newCollections,
  popularInWomen,
} = require("../Controllers/productController");

router.post("/add", addProduct);
router.post("/remove", removeProduct);
router.get("/all", getAllProducts);
router.get("/newcollections", newCollections);
router.get("/popularinwomen", popularInWomen);

module.exports = router;
