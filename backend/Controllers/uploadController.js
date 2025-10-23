exports.uploadImage = (req, res) => {
  res.json({
    success: 1,
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
};
