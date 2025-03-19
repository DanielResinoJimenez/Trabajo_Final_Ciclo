import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Auth0Provider
      domain='dev-iajyc6ajhd80y8kb.us.auth0.com'
      clientId='qlbe44c1QTh3yvo8L4Xy5wCpuy0R0K8n'
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
