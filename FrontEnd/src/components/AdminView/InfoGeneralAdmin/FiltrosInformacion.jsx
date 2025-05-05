import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useFiltrosContext } from '../../../services/hooks/useFiltrosContext';

const FiltrosInformacion = () => {

    const {meses, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth} = useFiltrosContext();

    return (
        <div className='text-gray-950 py-3 px-6 flex items-center gap-10 py-10'>
            <div className='flex gap-6 items-center'>
                <label htmlFor="mes" className='font-bold'>Mes: </label>
                <select name="mes" id="mes" className='p-2 border rounded text-center w-30' value={selectedMonth} onChange={(e) => {setSelectedMonth(e.target.value)}}>
                    <option value="">Todos</option>
                    {
                        meses.map((mes, index) => (

                            <option key={index} value={index}>{mes}</option>

                        ))
                    }
                </select>
            </div>
            <div className='flex gap-6 items-center'>
                <label htmlFor="anyo" className='font-bold'>Año: </label>
                <DatePicker
                    selected={selectedYear}
                    onChange={(date) => setSelectedYear(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="Selecciona un año"
                    className="p-2 border rounded text-center w-20"
                />
            </div>
        </div>
    )
}

export default FiltrosInformacion