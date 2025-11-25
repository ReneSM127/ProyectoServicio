import React, { forwardRef, useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import api from "../api/api";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductoDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "hogar",
    tags: "",
    new_price: "0",
    old_price: "",
    stock: "",
    available: "true",
  });

  const changeHandler = (e) => {
    const { name, value, type } = e.target;

    // Lógica solo para campos de tipo "number"
    if (type === "number") {
      // Solo actualiza el estado si:
      // 1. El campo está vacío (permitiendo al usuario borrar el número)
      // 2. El valor convertido a número es 0 o más.
      if (value === "" || Number(value) >= 0) {
        setProductoDetails({ ...productDetails, [name]: value });
      }
      // Si es un número negativo (ej: Number("-5") es -5), no hace nada.
      // Si es inválido (ej: Number("-") es NaN), no hace nada.
    } 
    else {
      // Para todos los demás campos (text, textarea, select), actualiza normalmente
      setProductoDetails({ ...productDetails, [name]: value });
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const Add_Product = async () => {
    // <-- VALIDACIÓN ACTUALIZADA -->
    if (
      !image ||
      !productDetails.name ||
      !productDetails.new_price ||
      !productDetails.old_price ||
      !productDetails.description ||
      !productDetails.stock
    ) {
      alert(
        "Por favor, completa todos los campos obligatorios y selecciona una imagen."
      );
      return;
    }

    console.log("Iniciando subida...", productDetails);

    try {
      const formData = new FormData();
      formData.append("product", image);
      const uploadResponse = await api.post("/upload", formData);
      const responseData = uploadResponse.data;

      if (responseData.success) {
        // <-- PROCESAMIENTO DE DATOS ANTES DE ENVIAR -->
        const tagsArray = productDetails.tags
          .split(",") // Convierte string a array
          .map((tag) => tag.trim()) // Limpia espacios
          .filter((tag) => tag); // Remueve tags vacíos

        let product = {
          ...productDetails,
          image: responseData.image_url,
          tags: tagsArray, // Envía el array de tags
          stock: Number(productDetails.stock), // Convierte a número
          available: productDetails.available === "true", // Convierte a booleano
        };

        console.log("Imagen subida, añadiendo producto:", product);

        const addProductResponse = await api.post("/products/add", product);

        if (addProductResponse.data.success) {
          alert("Producto añadido exitosamente");
          setImage(false);
          // <-- RESETEO DE ESTADO ACTUALIZADO -->
          setProductoDetails({
            name: "",
            description: "",
            image: "",
            category: "hogar",
            tags: "",
            new_price: "0",
            old_price: "",
            stock: "",
            available: "true",
          });
        } else {
          alert("Error al añadir el producto a la base de datos.");
        }
      } else {
        alert("Error al subir la imagen.");
      }
    } catch (error) {
      console.error("Error en el proceso de añadir producto:", error);
      alert("Ocurrió un error. Revisa la consola para más detalles.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Titulo producto</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Escribe aquí"
        />
      </div>

      {/* <-- NUEVO CAMPO: DESCRIPCIÓN --> */}
      <div className="addproduct-itemfield">
        <p>Descripción</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Describe tu producto..."
          rows="5"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Escribe aquí"
            min={0}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Precio de oferta</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Escribe aquí"
            min={0}
          />
        </div>
      </div>

      {/* <-- NUEVO CAMPO: STOCK --> */}
      <div className="addproduct-itemfield">
        <p>Stock (Cantidad disponible)</p>
        <input
          value={productDetails.stock}
          onChange={changeHandler}
          type="number"
          name="stock"
          placeholder="Ej: 10"
          min={0}
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Categoría</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selecter"
        >
          <option value="hogar">Hogar</option>
          <option value="accesorios">Accesorios</option>
          <option value="ropa">Ropa</option>
        </select>
      </div>

      {/* <-- NUEVO CAMPO: TAGS --> */}
      <div className="addproduct-itemfield">
        <p>Tags (separados por comas)</p>
        <input
          value={productDetails.tags}
          onChange={changeHandler}
          type="text"
          name="tags"
          placeholder="Ej: cerámica, hecho a mano, taza"
        />
      </div>

      {/* <-- NUEVO CAMPO: DISPONIBILIDAD --> */}
      <div className="addproduct-itemfield">
        <p>Disponibilidad</p>
        <select
          value={productDetails.available}
          onChange={changeHandler}
          name="available"
          className="add-product-selecter"
        >
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        Añadir
      </button>
    </div>
  );
};

export default AddProduct;
