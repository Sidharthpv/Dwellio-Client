import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AddToBookmark from './ContextAPI/AddToBookmark.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddToBookmark>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AddToBookmark>
  </StrictMode>,
)
