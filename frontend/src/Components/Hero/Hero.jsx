import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>Llevate un pedacito de México contigo</h2> {/*New Arrivals*/}
                <div>
                    <div className="hero-hand-icon">
                        <p>Nuevas</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Artesanias</p>
                    <p>Disponibles</p>
                </div>
                <div className='hero-lastest-btn'>
                    <div>Ver artesanias</div>
                    <img src={arrow_icon} alt="" />

                </div>

            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />

            </div>
        </div>
    )
}

export default Hero;