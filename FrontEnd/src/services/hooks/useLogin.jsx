import React from 'react'

import { useState } from 'react';

const API_URL = 'http://localhost:3000/api'; // Cambia esto si tu backend está en otro puerto o dominio

const useLogin = () => {

    const [login, setLogin] = useState(true);
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado para login
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    // Estado para registro
    const [registerData, setRegisterData] = useState({
        email_user: '',
        password_user: '',
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
        if (!loginData.email || !loginData.password) {
            setFormError('Todos los campos son obligatorios para iniciar sesión.');
            return false;
        }
        return true;
    };

    const validateRegister = () => {
        const { email_user, password_user, nombre, apellidos, direccion, telefono } = registerData;
        if (!email_user || !password_user || !nombre || !apellidos || !direccion || !telefono) {
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
            email: loginData.email,
            password: loginData.password
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
            email_user: registerData.email_user,
            password_user: registerData.password_user,
            nombre: registerData.nombre,
            apellidos: registerData.apellidos,
            direccion: registerData.direccion,
            telefono: registerData.telefono
        };

        const result = await registerUser(newUser);

        if (result) {
            console.log('Registro exitoso:', result);
            setLogin(true);

        } else {
            setFormError('Error al registrar. Intenta de nuevo.');
        }
    };

    return {
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
    };
};

export default useLogin;
