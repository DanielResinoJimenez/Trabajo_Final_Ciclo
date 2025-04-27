import React from 'react'

const HeaderTable = ({ columnas }) => {
    return (
        <thead className="bg-yellow-950 text-white sticky top-0 z-10">
            <tr>
                {columnas.map((columna) => (
                    <th
                        key={columna}
                        className={`px-4 py-3 border-b border-gray-300 ${columna === "Monto" || columna === "Acciones" ? "text-right" : ""
                            }`}
                    >
                        {columna}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default HeaderTable;
