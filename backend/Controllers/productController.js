const Product = require("../Models/Product");

exports.addProduct = async (req, res) => {
  const product = new Product({ ...req.body });
  await product.save();
  res.json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.body._id }, 
      { ...req.body }, 
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error actualizando:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.body._id });
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
