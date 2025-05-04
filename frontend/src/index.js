import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

