import React, { createContext, useContext } from 'react'

import { useState } from 'react';

const API_URL = 'http://localhost:3000/api'; // Cambia esto si tu backend está en otro puerto o dominio

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {

    const [changePass, setChangePass] = useState(false);
    const [login, setLogin] = useState(true);
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado para login
    const [loginData, setLoginData] = useState({
        email_login: '',
        password_login: '',
    });

    // Estado para registro
    const [registerData, setRegisterData] = useState({
        email_register: '',
        password_register: '',
        // Puedes agregar más campos si tu API los necesita, ej: nombre, rol, etc.
    });

    // Función para manejar cambios en los inputs de login
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para manejar cambios en los inputs de registro
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // LOGIN
    const loginUser = async ({ email, password }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_user: email, password_user: password }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

            localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario en localStorage

            return data; // Retorna los datos del usuario o token
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/usuarios/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error al registrar usuario');

            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const validateLogin = () => {

        console.log(loginData)
        if (!loginData.email_login || !loginData.password_login) {
            setFormError('Todos los campos son obligatorios para iniciar sesión.');
            return false;
        }
        return true;
    };

    const validateRegister = () => {
        console.log(registerData)
        const { email_register, password_register, nombre, apellidos, direccion, telefono } = registerData;
        if (!email_register || !password_register || !nombre || !apellidos || !direccion || !telefono) {
            setFormError('Todos los campos son obligatorios para registrarse.');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!validateLogin()) return;

        const result = await loginUser({
            email: loginData.email_login,
            password: loginData.password_login
        });

        if (result) {
            console.log('Login exitoso:', result);
            window.location.href = '/'; // Redirige a la página principal o dashboard
        } else {
            setFormError('Correo o contraseña incorrectos.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!validateRegister()) return;

        const newUser = {
            email_user: registerData.email_register,
            password_user: registerData.password_register,
            nombre: registerData.nombre,
            apellidos: registerData.apellidos,
            direccion: registerData.direccion,
            telefono: registerData.telefono
        };

        const result = await registerUser(newUser);

        if (result) {
            console.log('Registro exitoso:', result);
            setLogin(true);
            window.location.href = '/login';

        } else {
            setFormError('Error al registrar. Intenta de nuevo.');
        }
    };

    const requestChangePass = async (e) => {
        e.preventDefault(); 
        setLoading(true);   

        const email = e.target.email.value; 

        if (!email || !email.includes('@')) {
            setFormError('Por favor, introduce un correo válido.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/usuarios/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al enviar la solicitud.');
            }

            // Puedes manejar una respuesta exitosa aquí, como mostrar un mensaje
            console.log('Respuesta del servidor:', data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContext.Provider value={{
            loginUser,
            registerUser,
            loading,
            error,
            handleLoginChange,
            handleRegisterChange,
            loginData,
            registerData,
            validateLogin,
            validateRegister,
            handleLogin,
            handleRegister,
            formError,
            setFormError,
            login,
            setLogin,
            changePass,
            setChangePass,
            requestChangePass
        }}>
            {children}
        </LoginContext.Provider>
    )
};

