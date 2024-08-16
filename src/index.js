import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="205075740626-0eq7dms1780vk95up2acce0r64pu56dm.apps.googleusercontent.com">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
