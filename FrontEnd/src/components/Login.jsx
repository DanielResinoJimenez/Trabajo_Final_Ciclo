import React from 'react'
import login from './../assets/images/login.png';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='flex justify-around items-center login__container w-[80%] m-auto rounded-lg shadow-lg shadow-yellow-950 w-screen h-screen'>
            <div className='h-1/2 w-[30%]'>
                <img src={login} alt="" className='w-[500px]'/>
            </div>
            <div className='w-[40%]'>
                <form noValidate className='login__form w-[]'>
                    <div>
                        <label htmlFor="username">Correo electrónico:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <span id='error__login' className='hidden'></span>
                    <Link to={'/'}><button type="submit">Entrar</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Login