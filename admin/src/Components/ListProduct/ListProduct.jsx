import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
import api from '../api/api'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await api.get("/products/all");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      alert("No se pudieron cargar los productos.");
    }
  };

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (_id)=>{
    try {
      await api.post('/products/remove', { _id: _id });
      
      await fetchInfo(); 

    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert(error);
    }
  }

  return (
    <div className="list-product">
      <h1>Lista de todos los productos</h1>
      <div className="listproduct-format-main">
        <p>Productos</p>
        <p>Titulos</p>
        <p>Precio</p>
        <p>Precio Oferta</p>
        <p>Categoria</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product._id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  );
};

export default ListProduct;
