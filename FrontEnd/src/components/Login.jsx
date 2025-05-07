import React, { useState } from 'react'
import loginPhoto from './../assets/images/login.png';
import { Link, Outlet } from 'react-router-dom';
import { useLoginContext } from '../services/hooks/loginContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const {
        loading,
        handleLogin,
        handleRegister,
        formError,
        setFormError,
        login,
        setLogin,
    } = useLoginContext();

    return (
        <div className='flex justify-around items-center login__container w-[80%] m-auto rounded-lg shadow-lg shadow-yellow-950 w-screen h-screen'>
            <div className='h-1/2 w-[30%]'>
                <img src={loginPhoto} alt="Login" className='w-[500px]' />
            </div>
            <div className='w-[40%]'>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
};


export default Login