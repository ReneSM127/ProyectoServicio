import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Recibe Novedades en tu Correo</h1>
        <p>Suscribete para Mantener Actualizado de las Novedades</p>
        <div>
            <input type="email" placeholder='Email' />
            <button>Suscribirse</button>
        </div>
    </div>
  )
}

export default NewsLetter