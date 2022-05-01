import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'simplebar/dist/simplebar.min.css'

import { ThemeProvider } from '@mui/material/styles'
import lightTheme from './themes/lightTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>
);

