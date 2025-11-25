import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../AddProduct/AddProduct.css"; // Reutilizamos los estilos
import upload_area from "../../assets/upload_area.svg";
import api from "../api/api";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { product } = location.state || {}; 

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    _id: "",
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

  // Cargar datos al montar el componente
  useEffect(() => {
    if (product) {
      setProductDetails({
        ...product,
        // Aseguramos que tags sea string para el input, si viene como array
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags,
        available: String(product.available) // Convertir bool a string para el select
      });
    } else {
      alert("No se seleccionó ningún producto para editar.");
      navigate("/listproduct"); // Redirigir si no hay datos
    }
  }, [product, navigate]);

  const changeHandler = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      if (value === "" || Number(value) >= 0) {
        setProductDetails({ ...productDetails, [name]: value });
      }
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const Update_Product = async () => {
    console.log("Actualizando...", productDetails);
    let updatedProduct = { ...productDetails };

    try {
      // 1. Si el usuario seleccionó una NUEVA imagen, la subimos primero
      if (image) {
        const formData = new FormData();
        formData.append("product", image);
        const uploadResponse = await api.post("/upload", formData);
        
        if (uploadResponse.data.success) {
          updatedProduct.image = uploadResponse.data.image_url;
        } else {
          alert("Error al subir la nueva imagen");
          return;
        }
      }

      // 2. Procesar tags y tipos de datos
      const tagsArray = typeof updatedProduct.tags === 'string' 
        ? updatedProduct.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag)
        : updatedProduct.tags;

      updatedProduct.tags = tagsArray;
      updatedProduct.stock = Number(updatedProduct.stock);
      updatedProduct.available = updatedProduct.available === "true";

      // 3. Enviar al endpoint de actualización
      const response = await api.post("/products/update", updatedProduct);

      if (response.data.success) {
        alert("Producto actualizado exitosamente");
        navigate("/listproduct"); // Volver a la lista
      } else {
        alert("Error al actualizar el producto.");
      }

    } catch (error) {
      console.error("Error en update:", error);
      alert("Ocurrió un error.");
    }
  };

  return (
    <div className="add-product">
      <h2>Editar Producto</h2>
      <div className="addproduct-itemfield">
        <p>Titulo producto</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" />
      </div>

      <div className="addproduct-itemfield">
        <p>Descripción</p>
        <textarea value={productDetails.description} onChange={changeHandler} name="description" rows="5" />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio Original</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" />
        </div>
        <div className="addproduct-itemfield">
          <p>Precio Oferta</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Stock</p>
        <input value={productDetails.stock} onChange={changeHandler} type="number" name="stock" />
      </div>

      <div className="addproduct-itemfield">
        <p>Categoría</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selecter">
          <option value="hogar">Hogar</option>
          <option value="accesorios">Accesorios</option>
          <option value="ropa">Ropa</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <p>Tags (separados por comas)</p>
        <input value={productDetails.tags} onChange={changeHandler} type="text" name="tags" />
      </div>

      <div className="addproduct-itemfield">
        <p>Disponibilidad</p>
        <select value={productDetails.available} onChange={changeHandler} name="available" className="add-product-selecter">
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <p>Imagen del Producto</p>
        <label htmlFor="file-input">
          {/* Muestra la imagen nueva si existe, sino la imagen original de la URL */}
          <img 
            src={image ? URL.createObjectURL(image) : productDetails.image || upload_area} 
            className="addproduct-thumnail-img" 
            alt="" 
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>

      <button onClick={Update_Product} className="addproduct-btn">
        Actualizar
      </button>
    </div>
  );
};

export default EditProduct;