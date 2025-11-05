import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='min-h-screen bg-linear-to-br from-gray-100 to-blue-50'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
)
