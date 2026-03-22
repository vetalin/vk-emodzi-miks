import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@vkontakte/vkui/dist/vkui.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);