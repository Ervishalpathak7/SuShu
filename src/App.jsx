import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store  from "./Redux-Toolkit/Store.js"; // Adjust as necessary
import { Navigate } from "react-router-dom";
import { authStatus } from "./Redux-Toolkit/Thunks"; // Adjust the path as needed
import { SocketProvider } from "./Context/SocketProvider";




import Homepage from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import Maintenance from './Components/Maintenance'
import Verification from './Components/Verification'



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStatus());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};



// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);
 
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Router Setup
const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/verify', element: <Verification /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <SocketProvider>
          <Dashboard />
        </SocketProvider>
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <Maintenance /> },
]);

// App Component

// Main entry point of the application
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


export default Main;
