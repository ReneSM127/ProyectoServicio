const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const check = await User.findOne({ email });
  if (check) return res.status(400).json({ success: false, errors: "Email en uso" });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new User({ name: username, email, password, cartData: cart });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, errors: "Usuario no encontrado" });
  if (user.password !== password)
    return res.json({ success: false, errors: "Contraseña incorrecta" });

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
};
