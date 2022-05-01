import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material/styles'
import lightTheme from './themes/lightTheme';

//#region --------------[ States ]--------------
import AuthState from './context/auth_context/AuthState';
import BlogState from './context/blog_context/BlogState';
// #endregion
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
          <AuthState>
              <BlogState> 
                  <App />
              </BlogState>
          </AuthState>
      </ThemeProvider>
  </React.StrictMode>
);

