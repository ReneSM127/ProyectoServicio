const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
