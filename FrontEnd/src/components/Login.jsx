import React, { useState } from 'react'
import loginPhoto from './../assets/images/login.png';
import { Link } from 'react-router-dom';
import useLogin from '../services/hooks/useLogin';

const Login = () => {

    const [login, setLogin] = useState(true);

    const { loginData, registerData, handleLoginChange, handleRegisterChange, loginUser, loading, error } = useLogin();

    const handleLogin = async () => {
        const result = await loginUser({ email: loginData.email, password: loginData.password });
        if (result) {
          console.log('Login exitoso:', result);
        }
      };
      
      const handleRegister = async () => {
        const newUser = {
          email_user: registerData.email_user,
          password_user: registerData.password_user,
          // otros campos necesarios por tu backend
        };
        const result = await registerUser(newUser);
        if (result) {
          console.log('Registro exitoso:', result);
        }
      };

    return (
        <div className='flex justify-around items-center login__container w-[80%] m-auto rounded-lg shadow-lg shadow-yellow-950 w-screen h-screen'>
            <div className='h-1/2 w-[30%]'>
                <img src={loginPhoto} alt="Login" className='w-[500px]' />
            </div>
            <div className='w-[40%]'>
                <form noValidate className='login__form flex flex-col items-center justify-center gap-4' id={ login ? 'login' : 'register' }>
                    {
                        login ? (
                            <h2 className='text-2xl'>Iniciar Sesión</h2>
                        ) : (
                            <h2 className='text-2xl'>Registro</h2>
                        )
                    }
                    <div className='flex flex-col gap-2 w-[60%] text-center'>
                        <label htmlFor="username" className='text-center text-xl'>Correo electrónico:</label>
                        <input type="text" id="username" name={login ? "email" : "email_user"} required className='border-b focus:outline-none focus:ring-0 text-center'
                            value={login ? loginData.email : registerData.email_user}
                            onChange={login ? handleLoginChange : handleRegisterChange}/>
                    </div>
                    <div className='flex flex-col gap-2 w-[60%] text-center'>
                        <label htmlFor="password" className='text-center text-xl'>Contraseña:</label>
                        <input type="password" id="password" name={login ? "password" : "password_user"} required className='border-b focus:outline-none focus:ring-0 text-center'
                            value={login ? loginData.password : registerData.password_user}
                            onChange={login ? handleLoginChange : handleRegisterChange}/>
                    </div>
                    <span id='error__login' className='hidden'></span>
                    {
                        login ? (
                            <span className='cursor-pointer' onClick={() => setLogin(false)}>Registrarse</span>
                        ) : (
                            <span className='cursor-pointer' onClick={() => setLogin(true)}>Ya tengo cuenta</span>
                        )
                    }
                    <Link to={'/'}><button type="submit" className='border px-20 py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950' onClick={ login ? handleLogin : handleRegister}>{ login ? 'Entrar' : 'Registrarse'}</button></Link>
                </form>
            </div>
        </div>
    );
};

export default Login