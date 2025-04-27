import React from 'react';
import useCuenta from '../../services/hooks/useCuenta';

const FooterTable = ({ saldo, tipo }) => {
    const { nuevaAccion } = useCuenta();

    return (
        <tfoot>
            {tipo === "Realizar" ? (
                <tr id="fila-boton" className={`sticky bottom-0 text-black text-right z-10 ${saldo >= 0 ? "bg-green-500" : "bg-red-500"
                    }`}>
                    <td><span
                        onClick={nuevaAccion}
                        className="hover:bg-green-300 transition-colors cursor-pointer bg-green-200 px-20 py-2 border rounded-xl text-lg font-bold"
                    >
                        +
                    </span></td>
                    <td></td>
                    <td></td>
                    {
                        tipo === "Realizar" && (<th></th>)
                    }
                    <td className="px-4 py-3 flex justify-between font-bold">
                        <span>Total:</span> {saldo} €
                    </td>
                </tr>
            ) : (
                <tr
                    className={`sticky bottom-0 text-black text-right z-10 ${saldo >= 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    <td></td>
                    <td></td>
                    <td></td>
                    {
                        tipo === "Realizar" && (<th></th>)
                    }
                    <td className="px-4 py-3 flex justify-between font-bold">
                        <span>Total:</span> {saldo} €
                    </td>
                </tr>
            )}


        </tfoot>
    );
};

export default FooterTable;

