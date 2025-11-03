const mongoose = require("mongoose");

// Este sub-esquema guarda una "foto" del producto al momento de la compra
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema], // Un array de los productos comprados
  totalAmount: { type: Number, required: true },
  
  // Opcional: Puedes añadir más campos
  // address: { type: String, required: true },
  // paymentStatus: { type: String, default: "Pending" },

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);