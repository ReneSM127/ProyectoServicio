const User = require("../Models/User");

exports.addToCart = async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
};

exports.removeFromCart = async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] -= 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ success: true });
};

exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData);
};
