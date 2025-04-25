import React from 'react'
import useCuenta from '../../../services/hooks/useCuenta';

const FooterTable = ({ saldo, tipo }) => {

    const { nuevaAccion } = useCuenta();

    return (
        <table className="w-full border-[1px] border-yellow-950 border-separate border-spacing-0 text-left">

            {tipo === "Realizar" ?
                <tfoot>
                    <tr className='' id='fila-boton'>
                        <td colSpan={8} className='text-center p-6 text-white text-2xl font-bold border-t border-gray-400'>
                            <span onClick={nuevaAccion} className='hover:bg-green-300 transition-colors cursor-pointer bg-green-500 px-20 py-2'>+</span>
                        </td>
                    </tr>
                    <tr className={`text-black rounded-xl text-right ${saldo >= 0 ? "bg-green-500" : "bg-red-500"}`}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="px-4 py-3 flex justify-between font-bold">
                            <span>Total:</span> {saldo} €
                        </td>
                    </tr>
                </tfoot>
                :
                <tfoot>
                    <tr className={`text-black rounded-xl text-right ${saldo >= 0 ? "bg-green-500" : "bg-red-500"}`}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="px-4 py-3 flex justify-between font-bold">
                            <span>Total:</span> {saldo} €
                        </td>
                    </tr>
                </tfoot>
            }


        </table>
    )
}

export default FooterTable