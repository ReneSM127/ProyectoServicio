import React, { createContext, useEffect, useState } from 'react'
import api from '../api/api'

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        api.get('/products/all')
            .then((response) => {
                setAll_Product(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });

        if (localStorage.getItem('isLoggedIn')) {
            api.post('/cart/get', {})
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
        }
    }, []);
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem('isLoggedIn')) {
            const payload = { itemId: itemId };
            
            api.post('/cart/add', payload)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error adding to cart:", error);
            });
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem('isLoggedIn')) {
            const payload = { itemId: itemId };

            api.post('/cart/remove', payload)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error removing from cart:", error);
            });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;