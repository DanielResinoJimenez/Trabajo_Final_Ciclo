import React, { useEffect } from 'react';
import { useCuentaContext } from '../../../services/hooks/cuentaContext';
import HistorialAccionesShow from './HistorialAccionesShow';
import HeaderTable from './HeaderTable';
import BodyTable from './BodyTable';
import FooterTable from './FooterTable';


const HistorialAcciones = ({activeTab}) => {
  const { getEmpresa, getCuentas, getDatos, acciones, loading, saldo, calcularSaldo } = useCuentaContext();

  useEffect(() => {
    console.log("Calculando saldo...")
    calcularSaldo();
  }, [acciones])

  // Comprobar si aún se están cargando los datos
  if (loading) {
    return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
  }



  return (
    <div className="w-[90%] m-auto mt-10 mb-20">
      {/* Tabla para encabezado */}
      <HeaderTable columnas={["Tipo de Acción", "Fecha", "Motivo", "Monto"]}/>

      {/* Contenedor scrollable para tbody */}
      <BodyTable acciones={acciones} activeTab={activeTab}/>

      {/* Tabla para el pie fijo */}
      <FooterTable saldo={saldo}/>
    </div>

  );
};

export default HistorialAcciones;
