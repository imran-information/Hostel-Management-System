import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import Router from './routes/Router.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ParallaxProvider } from 'react-scroll-parallax';
import CustomToaster from './pages/shared/CustomToaster/CustomToaster.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ParallaxProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ParallaxProvider>
        <CustomToaster />
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
