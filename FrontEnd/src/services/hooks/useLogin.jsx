import React from 'react'

import { useState } from 'react';

const API_URL = 'http://localhost:3000'; // Cambia esto si tu backend está en otro puerto o dominio

const useLogin = () => {

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

            // Puedes guardar el token si tu API lo envía:
            // localStorage.setItem('token', data.token);

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

    return {
        loginUser,
        registerUser,
        loading,
        error,
        handleLoginChange,
        handleRegisterChange,
        loginData,
        registerData,
    };
};

export default useLogin;
