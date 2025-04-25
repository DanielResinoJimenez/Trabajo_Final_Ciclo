import React from 'react'

const HeaderTable = ({ columnas }) => {
    return (
        <table className="w-full border-[1px] border-yellow-950 border-separate border-spacing-0 text-left">
            <thead className="bg-yellow-950 text-white">
                <tr>
                    {columnas.map((columna) => (
                        <th
                            key={columna}
                            className={`px-4 py-3 border-b border-gray-300 sticky top-0 bg-yellow-950 z-10 text-center ${columna === "Monto" || columna === "Acciones" ? "text-right" : ""
                                }`}
                        >
                            {columna}
                        </th>
                    ))}
                </tr>
            </thead>
        </table>
    )
}

export default HeaderTable