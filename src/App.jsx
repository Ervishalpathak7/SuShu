import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MaintenancePage from './Components/maintenance-page'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<MaintenancePage />} />
  )
)

export default Router
