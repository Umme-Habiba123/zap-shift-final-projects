import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router";
import router from './router/router.jsx';
import Aos from 'aos';

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='font-urbanist w-10/12 mx-auto'>
      <RouterProvider router={router} />
     </div>
  </StrictMode>
)
