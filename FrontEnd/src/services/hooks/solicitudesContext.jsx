import { createContext, useContext, useEffect, useState } from 'react';

const SolicitudesContext = createContext();

export const useSolicitudesContext = () => useContext(SolicitudesContext);

export const SolicitudesProvider = ({ children }) => {

    const getSolicitudes = async () => {

    }

    const getSolicitudesPendientes = async () => {

    }

    const getSolicitudesRechazadas = async () => {

    }

    return (
        <SolicitudesContext.Provider value={{  }}>
            {children}
        </SolicitudesContext.Provider>
    );
}
