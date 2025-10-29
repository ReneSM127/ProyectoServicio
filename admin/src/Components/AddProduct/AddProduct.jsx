import React, { forwardRef, useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import api from '../api/api'

const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productDetails, setProductoDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })

  const changeHandler = (e) =>{
    setProductoDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const imageHandler = (e) =>{
    setImage(e.target.files[0]);
  }

  const Add_Product = async ()=>{
    
    if (!image || !productDetails.name || !productDetails.new_price || !productDetails.old_price) {
      alert("Por favor, completa todos los campos y selecciona una imagen.");
      return;
    }

    console.log("Iniciando subida...", productDetails);
    
    try {
      const formData = new FormData();
      formData.append('product', image); 
      const uploadResponse = await api.post('/upload', formData);
      const responseData = uploadResponse.data;

      if(responseData.success){
        let product = { ...productDetails, image: responseData.image_url };
        console.log("Imagen subida, añadiendo producto:", product);

        const addProductResponse = await api.post('/products/add', product);
        
        if (addProductResponse.data.success) {
          alert("Producto añadido exitosamente");
          setImage(false);
          setProductoDetails({
            name:"", image:"", category:"women", new_price:"", old_price:""
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
  }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Titulo producto</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Escribe aquí" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Escribe aquí" />
        </div>
        <div className="addproduct-itemfield">
          <p>Precio de oferta</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Escribe aquí" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoría</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selecter">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
          <option value="ropa">Ropa</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image): upload_area} className="addproduct-thumnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
      </div>
      <button onClick={() =>{Add_Product()}} className="addproduct-btn">Añadir</button>
    </div>
  );
};

export default AddProduct;
