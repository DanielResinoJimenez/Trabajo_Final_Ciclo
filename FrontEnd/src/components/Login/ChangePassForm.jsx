import React, { useState } from 'react'

const ChangePassForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label htmlFor="passwordNew" className='text-center text-xl'>
                Nueva Contraseña:
            </label>
            <div className='w-full flex'>
                <input
                    type={showPassword ? "text" : "password"}
                    id="passwordNew"
                    name={"passwordNew"}
                    required
                    className='border-b focus:outline-none focus:ring-0 text-center w-full'
                />
                <i className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}></i>
            </div>
            <label htmlFor="passwordRepeat" className='text-center text-xl'>
                Repetir Nueva Contraseña:
            </label>
            <div className='w-full flex'>
                <input
                    type={showPassword ? "text" : "password"}
                    id="passwordRepeat"
                    name={"passwordRepeat"}
                    required
                    className='border-b focus:outline-none focus:ring-0 text-center w-full'
                />
                <i className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}></i>
            </div>
        </>
    )
}

export default ChangePassForm