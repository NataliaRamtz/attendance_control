import { createContext, useContext, ReactNode } from 'react';

// Definir la URL base del backend
//const BASE_URL = 'https://assistance-backend.onrender.com';
const BASE_URL = 'http://localhost:5000';

// Crear el contexto
const ApiContext = createContext<{
  get: (endpoint: string) => Promise<any>;
  post: (endpoint: string, body: any) => Promise<any>;
  put: (endpoint: string, body: any) => Promise<any>;
  del: (endpoint: string) => Promise<any>;
} | null>(null);

// Proveedor del contexto
export const ApiProvider = ({ children }: { children: ReactNode }) => {
  // Función para hacer solicitudes GET
  const get = async (endpoint: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  };

  // Función para hacer solicitudes POST
  const post = async (endpoint: string, body: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };

  // Función para hacer solicitudes PUT
  const put = async (endpoint: string, body: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };

  // Función para hacer solicitudes DELETE
  const del = async (endpoint: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  };

  return (
    <ApiContext.Provider value={{ get, post, put, del }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi debe usarse dentro de un ApiProvider');
  }
  return context;
};