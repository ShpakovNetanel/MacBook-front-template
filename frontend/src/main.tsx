import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { DirectionProvider } from '@base-ui-components/react'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <DirectionProvider direction='rtl'>
      <App />
    </DirectionProvider>
  </BrowserRouter>
)
