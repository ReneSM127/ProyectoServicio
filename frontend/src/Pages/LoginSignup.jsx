import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import api from '../api/api'

const LoginSignup = () => {

  const [state, setState] = useState("Registrarse");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  });

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Iniciar sesion", formData);
    
    try {
      const response = await api.post('/users/login', formData);
      const responseData = response.data;

      if(responseData.success){
        localStorage.setItem('isLoggedIn', 'true');
        window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + (error.response?.data?.errors || error.message));
    }
  }

  const signup = async ()=>{
    console.log("Registrarse", formData);

    try {
      const response = await api.post('/users/signup', formData);
      const responseData = response.data;

      if(responseData.success){
        localStorage.setItem('isLoggedIn', 'true');
        window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    } catch (error) {
      alert("Error al registrarse: " + (error.response?.data?.errors || error.message));
    }
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
            {state==="Registrarse"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Nombre' />:<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Correo' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Contraseña'/>
        </div>
        <button onClick={()=>{state==="Iniciar Sesión"?login():signup()}}>Continuar</button>
        {state==="Registrarse"?<p className="loginsignup-login">¿Ya tienes una cuenta? <span onClick={()=>{setState("Iniciar Sesión")}}>Inicia Sesión aquí</span></p>
        :<p className="loginsignup-login">Crea una cuenta <span onClick={()=>{setState("Registrarse")}}>Click aquí</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
