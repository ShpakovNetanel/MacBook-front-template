import { DirectionProvider as BaseDirectionProvider, Toast as BaseToast } from '@base-ui-components/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
        <Toaster position='bottom-left' />
      <BaseToast.Provider timeout={2000}>
        <BaseToast.Viewport />
        <BaseDirectionProvider direction='rtl'>
          <App />
        </BaseDirectionProvider>
      </BaseToast.Provider>
    </QueryClientProvider>
  </BrowserRouter>
)
