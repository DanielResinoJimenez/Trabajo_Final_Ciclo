import React from 'react'
import { useLoginContext } from '../../services/hooks/loginContext';
import { Link } from 'react-router-dom';

const ChangePass = () => {
    const {
        formError,
        loading,
        requestChangePass,
        setFormError
    } = useLoginContext();

    return (

        <form
            noValidate
            className='login__form flex flex-col items-center justify-center gap-4'
            onSubmit={(e) => {requestChangePass(e)}}
        >
            <h2 className='text-2xl'>
                Recuperar contraseña
            </h2>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="email" className='text-center text-xl'>
                    Correo electrónico:
                </label>
                <input
                    type="text"
                    id="email"
                    name={"email"}
                    required
                    className='border-b focus:outline-none focus:ring-0 text-center'
                />
            </div>

            {formError && (
                <span id='error__login' className='text-red-500 text-sm'>
                    {formError}
                </span>
            )}

            <div className='flex gap-4'>
                <Link to={"/login"} className='cursor-pointer text-blue-600 underline' onClick={setFormError(null)}>
                    Volver
                </Link>
            </div>

            <button
                type="submit"
                className='border px-20 w-[80%] flex justify-center items-center py-2 rounded bg-yellow-950 text-white hover:bg-gray-100 hover:text-yellow-950 cursor-pointer'
                disabled={loading}
            >
                Enviar correo
            </button>
        </form>
    )
}

export default ChangePass