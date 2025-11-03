import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    api
      .get("/products/all")
      .then((response) => {
        setAll_Product(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    if (localStorage.getItem("isLoggedIn")) {
      api
        .post("/cart/get", {})
        .then((response) => {
          const cartData = response.data.cart || response.data;
          console.log(cartData);
          setCartItems(cartData);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === itemId);
      if (existing) {
        return prev.map((item) =>
          item.productId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { productId: itemId, quantity: 1 }];
      }
    });

    if (localStorage.getItem("isLoggedIn")) {
      api
        .post("/cart/add", { itemId })
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === itemId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.productId === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.productId !== itemId);
      }
    });

    if (localStorage.getItem("isLoggedIn")) {
      api
        .post("/cart/remove", { itemId })
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const product = all_product.find((p) => p._id === cartItem.productId);
      if (product) {
        total += product.new_price * cartItem.quantity;
      }
    });
    return total;
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const checkout = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      // Opcional: redirigir a login si no está logueado
      alert("Por favor, inicia sesión para comprar");
      // (Aquí podrías usar react-router-dom para redirigir)
      return;
    }

    api
      .post("/orders/create", {}) // Llama al nuevo endpoint
      .then((response) => {
        if (response.data.success) {
          alert("¡Compra realizada con éxito!");
          // 2. Limpia el estado del carrito local
          setCartItems([]);
          // Opcional: Redirigir al usuario a una página de "gracias"
          // window.location.href = '/mis-pedidos';
        }
      })
      .catch((error) => {
        console.error("Error al procesar la compra:", error);
        alert("Hubo un error al procesar tu compra.");
      });
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    checkout
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
