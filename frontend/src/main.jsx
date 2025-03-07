import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from '../src/App.jsx'
import '../src/assets/styles/index.css'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter
  future={{
    v7_startTransition: true,
     v7_relativeSplatPath: true,
  }}>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
