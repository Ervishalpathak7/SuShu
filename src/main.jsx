import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './App';
import { SocketProvider } from './Context/SocketProvider'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={Router} />
    </SocketProvider>
  </StrictMode>,
);
