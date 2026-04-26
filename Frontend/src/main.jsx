import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { SimpananProvider } from './context/SimpananContext.jsx'
import { AnggotaProvider } from './context/AnggotaContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AnggotaProvider>
        <SimpananProvider>
          <App />
        </SimpananProvider>
      </AnggotaProvider>
    </AuthProvider>
  </BrowserRouter>

)
