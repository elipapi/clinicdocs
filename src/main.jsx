import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="391827795037-eiv5q46hjkoq6r02bo14oht7vihi73d8.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)