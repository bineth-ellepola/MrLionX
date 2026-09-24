import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// The dashboard is loaded only on /admin, so visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))
const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
