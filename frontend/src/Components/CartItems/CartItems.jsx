import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, checkout } = useContext(ShopContext);

  // Combinar datos del carrito con la info del producto
  const itemsWithDetails = cartItems.map(cartItem => {
    const product = all_product.find(p => p._id === cartItem.productId);
    if (!product) return null;

    // Calculamos el precio aquí mismo y lo agregamos al objeto
    const final_price = product.new_price === 0 ? product.old_price : product.new_price;
    
    return { 
        ...product, 
        quantity: cartItem.quantity,
        final_price: final_price // Ahora es parte de los datos del ítem
    };
}).filter(Boolean);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Producto</p>
        <p>Título</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Eliminar</p>
      </div>
      <hr />

      {itemsWithDetails.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>🛒 Tu carrito está vacío</p>
      ) : (
        itemsWithDetails.map((item) => (
          <div key={item._id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={item.image} alt={item.name} className='carticon-product-icon' />
              <p>{item.name}</p>
              <p>${item.final_price}</p>
              <button className='cartitems-quantity'>{item.quantity}</button>
              <p>${item.final_price * item.quantity}</p>
              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                onClick={() => removeFromCart(item._id)}
                alt="Eliminar"
              />
            </div>
            <hr />
          </div>
        ))
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total del Carrito</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Costo de Envío</p>
              <p>Gratis</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={checkout}>Continuar al pago</button>
        </div>
        <div className="cartitems-promocode">
          <p>Si tienes un código promocional, ingrésalo aquí:</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Código promocional' />
            <button>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
