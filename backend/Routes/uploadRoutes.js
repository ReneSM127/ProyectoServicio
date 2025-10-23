const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage } = require("../Controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

router.post("/", upload.single("product"), uploadImage);

module.exports = router;
