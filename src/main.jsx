import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext'; // <--- IMPORTANT IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* YOU MUST WRAP APP WITH THIS, OR IT WILL BE WHITE */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);