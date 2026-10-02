import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <ThemeProvider>
            <ProfileProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </ProfileProvider>
          </ThemeProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);