import { DirectionProvider, Toast } from '@base-ui-components/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster position='bottom-left'/>
    <Toast.Provider timeout={2000}>
      <Toast.Viewport />
      <DirectionProvider direction='rtl'>
        <App />
      </DirectionProvider>
    </Toast.Provider>
  </BrowserRouter>
)
