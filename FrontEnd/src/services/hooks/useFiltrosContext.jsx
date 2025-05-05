import { createContext, useContext, useEffect, useState } from 'react';

const FiltrosContext = createContext();

export const useFiltrosContext = () => useContext(FiltrosContext);

export const FiltrosProvider = ({ children }) => {

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const thisYear = new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState(new Date(thisYear, 0));

    const thisMonth = new Date().getMonth();

    const [selectedMonth, setSelectedMonth] = useState(thisMonth);



    return (
        <FiltrosContext.Provider value={{meses, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth}}>
            {children}
        </FiltrosContext.Provider>
    );
}
