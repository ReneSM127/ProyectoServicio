const User = require("../Models/User");
const Product = require("../Models/Product");

// Añadir al carrito
exports.addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(itemId);
    if (!product || !product.available) {
      return res.status(404).json({ success: false, message: "Producto no disponible" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    const existingItem = user.cartData.find((item) => item.product.toString() === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartData.push({ product: itemId, quantity: 1 });
    }

    await user.save();
    res.json({ success: true, cart: user.cartData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Quitar del carrito
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const item = user.cartData.find((item) => item.product.toString() === itemId);

    if (!item) return res.status(404).json({ success: false, message: "Producto no está en el carrito" });

    item.quantity -= 1;
    if (item.quantity <= 0) {
      user.cartData = user.cartData.filter((i) => i.product.toString() !== itemId);
    }

    await user.save();
    res.json({ success: true, cart: user.cartData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Obtener carrito
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const transformedCart = user.cartData.map(item => ({
      productId: item.product.toString(), // Cambia 'product' a 'productId'
      quantity: item.quantity
    }));

    // 3. Envía el carrito transformado
    res.json({ success: true, cart: transformedCart });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
