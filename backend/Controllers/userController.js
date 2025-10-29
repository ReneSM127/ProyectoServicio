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
  res.cookie('token', token, {
    httpOnly: true, // La cookie no es accesible desde JavaScript en el cliente
    secure: process.env.NODE_ENV === 'production', // Enviar solo por HTTPS en producción
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 
  });

  res.json({ success: true });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, errors: "Usuario no encontrado" });
  if (user.password !== password)
    return res.json({ success: false, errors: "Contraseña incorrecta" });

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ success: true });
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ success: true, message: "Sesión cerrada" });
};
