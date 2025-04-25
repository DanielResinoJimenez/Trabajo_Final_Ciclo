import React from 'react'
import { useProductosContext } from '../../../services/hooks/productosContext';
import useProductos from '../../../services/hooks/useProductos';
import useCuenta from '../../../services/hooks/useCuenta';

const RealizarAccionShow = ({ accion }) => {
    
    const { turnToModify, nuevaAccion } = useCuenta();

    const fechaFormat = accion.fecha.substring(0, accion.fecha.indexOf("T"));

    return (
        <tr className={`transition-colors ${accion.id_ganancia ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}>
            <td className='hidden' id='id_accion'>{accion.id_ganancia ? accion.id_ganancia : accion.id_perdida}</td>
            <td className="px-4 py-3">
                {
                    accion.id_ganancia && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                            Ingreso
                        </span>
                    )
                }
                {
                    accion.id_perdida && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                            Gasto
                        </span>
                    )
                }
            </td>
            <td className="px-4 py-3">{fechaFormat}</td>
            <td className="px-4 py-3">{accion.motivo}</td>
            <td className="px-4 py-3">{accion.monto} €</td>
            <td className="px-4 py-3 flex gap-4 justify-start items-center">
                <i
                    onClick={(e) => {turnToModify(e)}}
                    className="fa-solid fa-pen-to-square text-yellow-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"
                ></i>
                <i onClick={() => { eliminarAccion(accion.id_ganancia ? accion.id_ganancia : accion.id_perdida) }} className="fa-solid fa-trash text-red-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
            </td>
        </tr>
    )

}

export default RealizarAccionShow