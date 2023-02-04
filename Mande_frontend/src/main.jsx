import React from 'react'
import ReactDOM from 'react-dom/client'
import Inicio from './pages/Inicio/Inicio'
import RegisterT from './pages/RegisterT/RegisterT'
import RegisterC from './pages/RegisterC/RegisterC'
import './index.css'
import App from './App'
import Context from './context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
    
    <App/>

    </Context>
  </React.StrictMode>
)
