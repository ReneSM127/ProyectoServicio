const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true,default: "hola" }, // descripción del producto
  image: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String], // por ejemplo: ["cerámica", "hecho a mano"]
  new_price: { type: Number, required: true },
  old_price: { type: Number },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  //artisan: { type: mongoose.Schema.Types.ObjectId, ref: "Artisan" }, // relación con artesano
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
