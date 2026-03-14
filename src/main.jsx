import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen bg-linear-to-br from-gray-100 to-blue-50 text-black font-lora'>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
