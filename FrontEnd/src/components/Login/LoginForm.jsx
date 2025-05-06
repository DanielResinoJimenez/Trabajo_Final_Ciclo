import React, { useState } from 'react'
import { useLoginContext } from '../../services/hooks/loginContext';

const LoginForm = () => {
    const {
        loginData,
        handleLoginChange,
    } = useLoginContext();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
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
        </>
    )
}

export default LoginForm