const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./Config/db");

const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const uploadRoutes = require("./Routes/uploadRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();
const port = process.env.PORT || 4000;

// Middleware global
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(cookieParser());

// Conexión a la BD
connectDB();

// Rutas
app.get("/", (req, res) => res.send("Servidor Express corriendo"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Servir imágenes estáticas
app.use("/images", express.static(path.join(__dirname, "upload/images")));

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
