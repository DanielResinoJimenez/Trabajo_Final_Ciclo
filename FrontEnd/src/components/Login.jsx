import React from 'react'

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <form noValidate>
                <div>
                    <label htmlFor="username">Correo electrónico:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <span id='error__login' className='hidden'></span>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login