import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Asegúrate que la ruta a tu 'api' sea correcta
import './CSS/MyOrders.css'; // Crearemos este archivo para estilos

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Función para cargar los pedidos
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/myorders'); // Llama a la nueva ruta
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error al cargar los pedidos:", error);
      }
    };

    // Solo busca pedidos si el usuario está logueado
    if (localStorage.getItem("isLoggedIn")) {
      fetchOrders();
    }
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  return (
    <div className='my-orders'>
      <h1>Mis Pedidos</h1>
      <div className="my-orders-container">
        {orders.length === 0 ? (
          <p>Aún no tienes pedidos.</p>
        ) : (
          orders.map((order) => (
            // Cada 'order-box' es un pedido individual
            <div key={order._id} className="my-orders-box">
              <p className="my-orders-id"><b>ID del Pedido:</b> {order._id}</p>
              <p className="my-orders-date">
                <b>Fecha:</b> {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="my-orders-total">
                <b>Total:</b> ${order.totalAmount.toFixed(2)}
              </p>
              
              <p><b>Items:</b></p>
              {/* Mapea los productos dentro de cada pedido */}
              {order.items.map((item) => (
                <div key={item.productId} className="my-orders-item">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                  <span>Cantidad: {item.quantity}</span>
                  <span>Precio: ${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;