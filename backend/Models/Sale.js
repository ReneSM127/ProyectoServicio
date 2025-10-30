const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price_at_purchase: { type: Number, required: true }, // precio al momento de la compra
    },
  ],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ["Tarjeta", "PayPal", "Transferencia", "Efectivo"], required: true },
  status: { type: String, enum: ["Pendiente", "Pagado", "Enviado", "Entregado", "Cancelado"], default: "Pendiente" },
  shipping_address: {
    street: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
