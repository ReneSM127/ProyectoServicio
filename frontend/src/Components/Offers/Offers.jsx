import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Descubre</h1>
        <h1>Las Mejores Artesanias</h1>
        <p>En descuento</p>
        <button>Ver Ahora</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers