import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/ClientView/Home.jsx'
import Productos from './components/ClientView/Productos.jsx'
import Maquinas from './components/ClientView/Maquinas.jsx'
import PanelDeControl from './components/AdminView/PanelDeControl.jsx'
import ProductosAdmin from './components/AdminView/ProductosAdmin.jsx'
import MaquinasAdmin from './components/AdminView/MaquinasAdmin.jsx'
import CuentaAdmin from './components/AdminView/CuentaAdmin.jsx'
import SolicitudesAdmin from './components/AdminView/SolicitudesAdmin.jsx'
import InfoGeneralAdmin from './components/AdminView/InfoGeneralAdmin.jsx'
import Login from './components/Login.jsx'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Auth0Provider
      domain='dev-iajyc6ajhd80y8kb.us.auth0.com'
      clientId='qlbe44c1QTh3yvo8L4Xy5wCpuy0R0K8n'
      redirectUri={window.location.origin}
    >     
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path='productos' element={<Productos />} />
            <Route path='maquinas' element={<Maquinas />} />
            <Route path='panelControl' element={<PanelDeControl/>}>
              <Route index/>
              <Route path='productosAdmin' element={<ProductosAdmin/>}/>
              <Route path='maquinasAdmin' element={<MaquinasAdmin/>}/>
              <Route path='cuentaAdmin' element={<CuentaAdmin/>}/>
              <Route path='solicitudesAdmin' element={<SolicitudesAdmin/>}/>
              <Route path='infoGeneralAdmin' element={<InfoGeneralAdmin/>}/>
            </Route>
            <Route path='*' element={<h1>404</h1>} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
