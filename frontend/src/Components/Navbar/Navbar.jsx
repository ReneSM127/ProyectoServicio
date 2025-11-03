import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
//import logo from '../Assets/logo.png'
import logo from '../Assets/LogoJaguar2.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import api from '../../api/api'
import nav_dropdown from '../Assets/nav_dropdown.png'
const Navbar = () => {

    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();

    const handleLogout = async () => {
        try {
            await api.post('/users/logout');
            localStorage.removeItem('isLoggedIn');
            window.location.replace("/");

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            // Si falla, al menos desloguea el frontend
            localStorage.removeItem('isLoggedIn');
            window.location.replace("/");
        }
    }

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>Xouvenirs</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}><Link style={{textDecoration: 'none'}} to='/'>Tienda</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men") }}><Link style={{textDecoration: 'none'}} to='/mens'>Hogar</Link>{menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("woman") }}><Link style={{textDecoration: 'none'}} to='/womens'>Accesorios</Link>{menu === "woman" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{textDecoration: 'none'}} to='/kids'>Ropa</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('isLoggedIn')
                ?<button onClick={handleLogout}>Salir</button>
                :<Link to='/login'><button>Registrarse</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;
