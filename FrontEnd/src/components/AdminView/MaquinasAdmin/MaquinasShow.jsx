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
                <MaquinasAdminBody filtro={`${estado != "" ? estado : "General"}`}/>
            </div>
        )
    }

    if(activeTab === 2){
        return (
            <MaquinasAdminBody filtro={"En stock"}/>
        )
    }

    if(activeTab === 3){
        return (
            <MaquinasAdminBody filtro={"En mantenimiento"}/>
        )
    }

    if(activeTab === 4){
        return (
            <MaquinasAdminBody filtro={""}/>
        )
    }

}

export default MaquinasShow