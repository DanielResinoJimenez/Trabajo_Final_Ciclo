import React, { useState } from 'react'
import { useLoginContext } from '../../services/hooks/loginContext';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        registerData,
        handleRegister,
        handleRegisterChange,
        formError,
        loading
    } = useLoginContext();

    return (
        <form
            noValidate
            className='login__form flex flex-col items-center justify-center gap-4'
            id={'register'}
            onSubmit={handleRegister}
        >
            <h2 className='text-2xl'>
                Iniciar Sesion
            </h2>
            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="email_register" className='text-center text-xl'>
                    Correo electrónico:
                </label>
                <input
                    type="text"
                    id="email_register"
                    name={"email_register"}
                    required
                    className='border-b focus:outline-none focus:ring-0 text-center'
                    value={registerData.email_register}
                    onChange={handleRegisterChange}
                />
            </div>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="password_register" className='text-center text-xl'>
                    Contraseña:
                </label>
                <div className='w-full flex'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password_register"
                        name={"password_register"}
                        required
                        className='border-b focus:outline-none focus:ring-0 text-center w-full'
                        value={registerData.password_register}
                        onChange={handleRegisterChange}
                    />
                    <i className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}></i>
                </div>

            </div>

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
            
            {formError && (
                <span id='error__login' className='text-red-500 text-sm'>
                    {formError}
                </span>
            )}

            <div className='flex gap-4'>
                <Link to={"/login"} className='cursor-pointer text-blue-600 underline'>
                    Ya tengo cuenta
                </Link>
            </div>

            <button
                type="submit"
                className='border px-20 w-[80%] flex justify-center items-center py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950 cursor-pointer'
                disabled={loading}
            >
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm