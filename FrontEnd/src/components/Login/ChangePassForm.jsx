import React, { useState } from 'react'
import { useLoginContext } from '../../services/hooks/loginContext';

const ChangePassForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
            formError,
            loading
        } = useLoginContext();

    return (

        <form
            noValidate
            className='login__form flex flex-col items-center justify-center gap-4'
        >
            <h2 className='text-2xl'>
                Recuperar contraseña
            </h2>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
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
            </div>

            {formError && (
                <span id='error__login' className='text-red-500 text-sm'>
                    {formError}
                </span>
            )}

            <button
                type="submit"
                className='border px-20 w-[80%] flex justify-center items-center py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950 cursor-pointer'
                disabled={loading}
            >
                Cambiar contraseña
            </button>
        </form>
    )
}

export default ChangePassForm