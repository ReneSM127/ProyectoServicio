import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Ofeer on your email</h1>
        <p>Suscribe to our newsletter and saty updated</p>
        <div>
            <input type="email" placeholder='Your email id' />
            <button>Suscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter