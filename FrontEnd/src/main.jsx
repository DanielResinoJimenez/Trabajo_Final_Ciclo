import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/ClientView/Home.jsx'

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
            <Route path='*' element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
