const Product = require("../Models/Product");

exports.addProduct = async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();
  res.json({ success: true, product });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.newCollections = async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(-8));
};

exports.popularInWomen = async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.json(products.slice(0, 4));
};
