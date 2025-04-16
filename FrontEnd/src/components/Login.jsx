import React, { useState } from 'react'
import loginPhoto from './../assets/images/login.png';
import { Link } from 'react-router-dom';
import useLogin from '../services/hooks/useLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);


    const {
        loginData,
        registerData,
        handleLoginChange,
        handleRegisterChange,
        loginUser,
        registerUser,
        loading,
        error,
        handleLogin,
        handleRegister,
        validateLogin,
        validateRegister,
        formError,
        setFormError,
        login,
        setLogin,
    } = useLogin();



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

                    <div className='flex flex-col gap-2 w-[60%] text-center'>
                        <label htmlFor="username" className='text-center text-xl'>
                            Correo electrónico:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name={login ? "email" : "email_user"}
                            required
                            className='border-b focus:outline-none focus:ring-0 text-center'
                            value={login ? loginData.email : registerData.email_user}
                            onChange={login ? handleLoginChange : handleRegisterChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-[60%] text-center'>
                        <label htmlFor="password" className='text-center text-xl'>
                            Contraseña:
                        </label>
                        <div className='w-full flex'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name={login ? "password" : "password_user"}
                                required
                                className='border-b focus:outline-none focus:ring-0 text-center w-full'
                                value={login ? loginData.password : registerData.password_user}
                                onChange={login ? handleLoginChange : handleRegisterChange}
                            />
                            <i className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}></i>
                        </div>

                    </div>

                    {/* Campos extra solo en modo registro */}
                    {!login && (
                        <>
                            <div className='flex max-xl:flex-col min-xl:gap-4 min-xl:w-[60%] min-xl:overflow-hidden min-xl:justify-center items-center justify-center w-[100%]'>
                                <div className='flex flex-col gap-2 w-[60%] text-center'>
                                    <label htmlFor="nombre" className='text-center text-xl'>Nombre:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className='border-b focus:outline-none focus:ring-0 text-center'
                                        value={registerData.nombre || ''}
                                        onChange={handleRegisterChange}
                                    />
                                </div>

                                <div className='flex flex-col gap-2 w-[60%] text-center'>
                                    <label htmlFor="apellidos" className='text-center text-xl'>Apellidos:</label>
                                    <input
                                        type="text"
                                        id="apellidos"
                                        name="apellidos"
                                        className='border-b focus:outline-none focus:ring-0 text-center'
                                        value={registerData.apellidos || ''}
                                        onChange={handleRegisterChange}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 w-[60%] text-center'>
                                <label htmlFor="direccion" className='text-center text-xl'>Dirección:</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    className='border-b focus:outline-none focus:ring-0 text-center'
                                    value={registerData.direccion || ''}
                                    onChange={handleRegisterChange}
                                />
                            </div>

                            <div className='flex flex-col gap-2 w-[60%] text-center'>
                                <label htmlFor="telefono" className='text-center text-xl'>Teléfono:</label>
                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    className='border-b focus:outline-none focus:ring-0 text-center'
                                    value={registerData.telefono || ''}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </>
                    )}

                    {formError && (
                        <span id='error__login' className='text-red-500 text-sm'>
                            {formError}
                        </span>
                    )}

                    <span
                        className='cursor-pointer text-blue-600 underline'
                        onClick={() => {
                            setLogin(!login);
                            setFormError('');
                        }}
                    >
                        {login ? 'Registrarse' : 'Ya tengo cuenta'}
                    </span>

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