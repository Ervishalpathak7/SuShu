import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MaintenancePage from './Components/maintenance-page'
import { Homepage } from './Components/homepage'
import { Login } from './Components/login'
import { Signup } from './Components/signup'
import MainPage from './Components/main-page'

const Router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Main" element={<MainPage />} />
      <Route path="*" element={<MaintenancePage />} />

    </>

  )
)

export default Router
