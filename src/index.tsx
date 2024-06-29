import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import configManager from './managers/configManager.ts';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals.ts';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
