import React, { useState } from 'react'
import { useLoginContext } from '../../services/hooks/loginContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const {
        loginData,
        handleLogin,
        handleLoginChange,
        formError,
        loading,
        setFormError
    } = useLoginContext();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            noValidate
            className='login__form flex flex-col items-center justify-center gap-4'
            id={'login'}
            onSubmit={handleLogin}
        >
            <h2 className='text-2xl'>
                Iniciar Sesion
            </h2>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="email_login" className='text-center text-xl'>
                    Correo electrónico:
                </label>
                <input
                    type="text"
                    id="email_login"
                    name={"email_login"}
                    required
                    className='border-b focus:outline-none focus:ring-0 text-center'
                    value={loginData.email_login}
                    onChange={handleLoginChange}
                />
            </div>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="password_login" className='text-center text-xl'>
                    Contraseña:
                </label>
                <div className='w-full flex'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password_login"
                        name={"password_login"}
                        required
                        className='border-b focus:outline-none focus:ring-0 text-center w-full'
                        value={loginData.password_login}
                        onChange={handleLoginChange}
                    />
                    <i className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}></i>
                </div>

            </div>

            {formError && (
                <span id='error__login' className='text-red-500 text-sm'>
                    {formError}
                </span>
            )}

            <Link to={"/"} className='underline text-yellow-950'>Continuar sin iniciar sesión</Link>

            <div className='flex gap-4'>
                <Link to={"register"} onClick={() => {setFormError(null)}} className='cursor-pointer text-blue-600 underline'>
                    Registrarse
                </Link>


                <Link to={"forgot-password"} className='underline text-blue-600 cursor-pointer'>
                    <span>
                        Olvidé mi contraseña
                    </span>
                </Link>

            </div>

            <button
                type="submit"
                className='border px-20 w-[80%] flex justify-center items-center py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950 cursor-pointer'
                disabled={loading}
            >
                Entrar
            </button>
        </form>

    )
}

export default LoginForm