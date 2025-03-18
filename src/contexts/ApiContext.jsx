"use client"

import { createContext, useContext, useState } from "react"
import { useAuth } from "./AuthContext"
import { API_CONFIG } from "../config/api.config"

// Crear el contexto para la API
const ApiContext = createContext()

// Hook personalizado para usar el contexto
export const useApi = () => useContext(ApiContext)

// Proveedor del contexto
export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token, logout } = useAuth()

  // Función base para hacer peticiones
  const fetchApi = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`; // Asegúrate de incluir el endpoint completo
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        logout();
        throw new Error("Sesión expirada");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error en la petición");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error en la petición");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Funciones específicas para cada cosa

  // Grupos
  const groupsApi = {
    getAll: async () => fetchApi(API_CONFIG.ENDPOINTS.GROUPS),
    create: (data) => fetchApi(API_CONFIG.ENDPOINTS.GROUPS, { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${id}`, { method: "DELETE" })
  }

  // Docentes
  const teachersApi = {
    getAll: async () => {
      const data = await fetchApi(`${API_CONFIG.ENDPOINTS.AUTH.GET_USERS}?role=user`);
      return data;
    },
    create: async (teacherData) => {
      const data = await fetchApi(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        body: JSON.stringify({ ...teacherData, role: "user" }), // Asegúrate de asignar el rol 'user'
      });
      return data;
    },
    update: async (id, teacherData) => {
      const data = await fetchApi(`${API_CONFIG.ENDPOINTS.AUTH.UPDATE_USER}/${id}`, {
        method: "PUT",
        body: JSON.stringify(teacherData),
      });
      return data;
    },
    delete: async (id) => {
      const data = await fetchApi(`${API_CONFIG.ENDPOINTS.AUTH.DELETE_USER}/${id}`, {
        method: "DELETE",
      });
      return data;
    },
  };

  // Estudiantes
  const studentsApi = {
    getAll: () => fetchApi(API_CONFIG.ENDPOINTS.STUDENTS),
    create: (data) =>
      fetchApi(API_CONFIG.ENDPOINTS.STUDENTS, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.STUDENTS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.STUDENTS}/${id}`, {
        method: "DELETE",
      }),
  }

  // Asistencias
  const attendanceApi = {
    getByGroup: (groupId, date) => fetchApi(`${API_CONFIG.ENDPOINTS.ATTENDANCE}/group/${groupId}?date=${date}`),
    save: (groupId, data) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.ATTENDANCE}/group/${groupId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getHistory: (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString()
      return fetchApi(`${API_CONFIG.ENDPOINTS.ATTENDANCE}/history${queryParams ? `?${queryParams}` : ""}`)
    },
    justify: (attendanceId, data) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.ATTENDANCE}/${attendanceId}/justify`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  }

  return (
    <ApiContext.Provider
      value={{
        loading,
        error,
        groups: groupsApi,
        teachers: teachersApi,
        students: studentsApi,
        attendance: attendanceApi,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
