import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Homepage from './Components/Home'
import Login from './Components/login'
import Signup from './Components/signup'
import Dashboard from './Components/Dashboard'
import Maintenance from './Components/Maintenance'





const Router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Maintenance />} />
    </>

  )
)

export default Router
