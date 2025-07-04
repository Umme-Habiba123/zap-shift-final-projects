import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css';
import {

  RouterProvider,
} from "react-router";
import router from './router/router.jsx';
import Aos from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Aos.init()

const queryClient=new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <div className='font-urbanist w-10/12 mx-auto'>
      <RouterProvider router={router} />
     </div>
     </AuthProvider>
     </QueryClientProvider>
  </StrictMode>
)
