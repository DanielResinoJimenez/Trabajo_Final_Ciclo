import React, { useEffect } from 'react'
import RealizarAccionShow from './RealizarAccionShow'
import { useCuentaContext } from '../../../services/hooks/cuentaContext'
import useCuenta from '../../../services/hooks/useCuenta';
import HeaderTable from './../HeaderTable';
import BodyTable from './../BodyTable';
import FooterTable from './../FooterTable';

const RealizarAccion = ({activeTab}) => {

  const {acciones, loading, saldo, calcularSaldo} = useCuentaContext();

  useEffect(() => {
    calcularSaldo();  // Calcular el saldo al montar el componente
  }, [acciones])

  // Comprobar si aún se están cargando los datos
  if (loading) {
    return <div>Cargando...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  return (
    <div className="w-[90%] m-auto mt-10 mb-20">

      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full border-[1px] border-yellow-950 border-separate border-spacing-0 text-left">
          <HeaderTable columnas={["Tipo de Acción", "Fecha", "Motivo", "Monto", "Acciones"]} />
          <BodyTable acciones={acciones} activeTab={activeTab} />
          <FooterTable saldo={saldo} tipo={activeTab === 2 ? "Realizar" : "Historial"} />
        </table>
      </div>
    </div>
  );
}

export default RealizarAccion