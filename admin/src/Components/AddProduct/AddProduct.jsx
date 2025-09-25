import React, { forwardRef, useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

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
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp) => resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Producto añadido"):alert("Hubo un error")
      })
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
