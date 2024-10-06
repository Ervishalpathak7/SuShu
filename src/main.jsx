import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MaintenancePage from './Components/maintenance-page.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={Router} />
  </StrictMode>,
)
