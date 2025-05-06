import React, { useState } from 'react'
import loginPhoto from './../assets/images/login.png';
import { Link, Outlet } from 'react-router-dom';
import { useLoginContext } from '../services/hooks/loginContext';


const Login = () => {

    const {
        loading,
        handleLogin,
        handleRegister,
        formError,
        setFormError,
        login,
        setLogin,
    } = useLoginContext();



    return (
        <div className='flex justify-around items-center login__container w-[80%] m-auto rounded-lg shadow-lg shadow-yellow-950 w-screen h-screen'>
            <div className='h-1/2 w-[30%]'>
                <img src={loginPhoto} alt="Login" className='w-[500px]' />
            </div>
            <div className='w-[40%]'>
                <form
                    noValidate
                    className='login__form flex flex-col items-center justify-center gap-4'
                    id={login ? 'login' : 'register'}
                    onSubmit={login ? handleLogin : handleRegister}
                >
                    <h2 className='text-2xl'>
                        {login ? 'Iniciar Sesión' : 'Registro'}
                    </h2>

                    <Outlet />

                    {
                        login && (
                            <>
                                <Link to={"/"} className='underline text-yellow-950'>Continuar sin iniciar sesión</Link>
                            </>
                        )
                    }

                    {formError && (
                        <span id='error__login' className='text-red-500 text-sm'>
                            {formError}
                        </span>
                    )}

                    <Link to={login ? "register" : ""} className='cursor-pointer text-blue-600 underline' onClick={() => {
                        setLogin(!login);
                        setFormError('');
                    }}>
                        {login ? 'Registrarse' : 'Ya tengo cuenta'}

                    </Link>

                    {
                        login && (
                            <Link to={"forgot-password"} className='underline text-yellow-950'>
                                <span>
                                    Olvidé mi contraseña
                                </span>
                            </Link>
                        )
                    }

                    <button
                        type="submit"
                        className='border px-20 w-[80%] flex justify-center items-center py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950'
                        disabled={loading}
                    >
                        {login ? 'Entrar' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Login