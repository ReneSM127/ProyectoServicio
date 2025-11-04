const User = require("../Models/User");
const Order = require("../Models/Order");

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cartData.product");

    if (!user || user.cartData.length === 0) {
      return res.status(400).json({ success: false, message: "El carrito está vacío" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Recalcular el total y preparar los items de la orden
    for (const item of user.cartData) {
      const product = item.product;
      
      // Validar si el producto aún existe o está disponible (lógica opcional)
      if (!product) {
         return res.status(404).json({ success: false, message: `Producto con ID ${item.product} no encontrado` });
      }

      const itemTotal = product.new_price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.new_price,
        quantity: item.quantity,
        image: product.image,
      });
    }

    // Crear la nueva orden
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
    });

    // Guardar la orden en la BD
    await newOrder.save();

    // Vaciar el carrito del usuario
    user.cartData = [];
    await user.save();

    res.json({ success: true, message: "¡Orden creada con éxito!", order: newOrder });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Obtener todas las órdenes del usuario
exports.getMyOrders = async (req, res) => {
  try {
    // Busca todas las órdenes que pertenezcan al ID del usuario
    // y las ordena de la más nueva a la más antigua
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    
    res.json({ success: true, orders: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};