import React, { useState } from 'react'
import './CSS/LoginSignup.css'

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
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=> responseData = data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async ()=>{
    console.log("Registrarse", formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=> responseData = data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
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
