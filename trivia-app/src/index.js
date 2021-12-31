import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
