import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './auth/authProvider.jsx'
import AppRouter from './routers/AppRouter.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Flip, ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import AuthInitializer from './auth/AuthInitializer.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
          <QueryClientProvider client={queryClient}>

    <AuthContextProvider>
      <AuthInitializer>
      
        <AppRouter />
         <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          theme='dark'
          transition={Flip}
        />
      </AuthInitializer>

    </AuthContextProvider>
                </QueryClientProvider>

    </BrowserRouter>
  
  </React.StrictMode>
)
