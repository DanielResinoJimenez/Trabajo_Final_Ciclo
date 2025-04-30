import React from 'react'
import MaquinasHeader from './MaquinasHeader'
import MaquinasAdminBody from './MaquinasAdminBody'
import { useMaquinasContext } from '../../../services/hooks/maquinasContext'

const MaquinasShow = ({activeTab}) => {

    const {estado} = useMaquinasContext();
  
    if(activeTab === 1){
        return (
            <div>
                <MaquinasHeader navOptions={["General", "Sin Reponer", "Apuntar recaudación"]}/>
                <MaquinasAdminBody filtro={estado}/>
            </div>
        )
    }

    if(activeTab === 2){
        return (
            <p>Estamos mostrando las máquinas en stock</p>
        )
    }

    if(activeTab === 3){
        return (
            <p>Estamos mostrando las máquinas en mantenimiento</p>
        )
    }

    if(activeTab === 4){
        return (
            <p>Estamos mostrando todas las máquinas</p>
        )
    }

}

export default MaquinasShow