import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApiProvider } from './context/ApiContext'; // Importar el ApiProvider
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </StrictMode>
);