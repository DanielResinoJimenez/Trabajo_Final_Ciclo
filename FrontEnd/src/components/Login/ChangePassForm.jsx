import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Asegúrate de importar useLocation
import { useLoginContext } from '../../services/hooks/loginContext';

const ChangePassForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { formError, setFormError, loading, changeOldPass } = useLoginContext();

    const location = useLocation();  
    const query = new URLSearchParams(location.search); 

    
    useEffect(() => {
        const emailParam = query.get('email');
        if (emailParam) {
            localStorage.setItem('recoveryEmail', emailParam);  
        }
    }, [location]); 

    const handleSubmit = (e) => {
        e.preventDefault();  

        const password = e.target.password.value;
        const passwordRepeat = e.target.passwordRepeat.value;

        if( !password || !passwordRepeat) {
            setFormError("Todos los campos son obligatorios");
            return;
        }

        if (password !== passwordRepeat) {
            setFormError("Las contraseñas deben ser iguales");
            return;
        }

        const email = localStorage.getItem('recoveryEmail');  // Recuperar el email de localStorage
        changeOldPass(email, password);  // Llamar a la función para cambiar la contraseña
    };

    return (
        <form
            noValidate
            className='login__form flex flex-col items-center justify-center gap-4'
            onSubmit={(e) => {handleSubmit(e)}}  // Usar onSubmit en lugar de onClick
        >
            <h2 className='text-2xl'>
                Recuperar contraseña
            </h2>

            <div className='flex flex-col gap-2 w-[60%] text-center'>
                <label htmlFor="password" className='text-center text-xl'>
                    Nueva Contraseña:
                </label>
                <div className='w-full flex'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        className='border-b focus:outline-none focus:ring-0 text-center w-full'
                    />
                    <i
                        className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>
                <label htmlFor="passwordRepeat" className='text-center text-xl'>
                    Repetir Nueva Contraseña:
                </label>
                <div className='w-full flex'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passwordRepeat"
                        name="passwordRepeat"
                        required
                        className='border-b focus:outline-none focus:ring-0 text-center w-full'
                    />
                    <i
                        className="fa-regular fa-eye-slash relative min-lg:right-10 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
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
    );
};

export default ChangePassForm;
