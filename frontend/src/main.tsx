import { DirectionProvider, Toast } from '@base-ui-components/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toast.Provider>
      <DirectionProvider direction='rtl'>
        <App />
      </DirectionProvider>
    </Toast.Provider>
  </BrowserRouter>
)
