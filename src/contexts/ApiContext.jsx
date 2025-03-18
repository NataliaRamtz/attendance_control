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
    setLoading(true)
    setError(null)

    try {
      // Configuración de la petición
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      }

      // Configurar timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      // En una implementación real, harías la petición al backend
      // const response = await fetch(url, {
      //   ...options,
      //   headers,
      //   signal: controller.signal
      // })

      // clearTimeout(timeoutId)

      // // Manejar errores de autenticación
      // if (response.status === 401) {
      //   logout()
      //   throw new Error('Sesión expirada')
      // }

      // if (!response.ok) {
      //   const errorData = await response.json().catch(() => ({}))
      //   throw new Error(errorData.message || 'Error en la petición')
      // }

      // const data = await response.json()
      // return data

      // Simulación para desarrollo
      await new Promise((resolve) => setTimeout(resolve, 500))
      clearTimeout(timeoutId)

      // Simular datos según el endpoint
      if (endpoint.includes("groups")) {
        return mockData.groups
      } else if (endpoint.includes("teachers")) {
        return mockData.teachers
      } else if (endpoint.includes("students")) {
        return mockData.students
      } else if (endpoint.includes("attendance")) {
        return mockData.attendance
      }

      return { success: true }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("La petición ha excedido el tiempo de espera")
      } else {
        setError(err.message || "Error en la petición")
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Funciones específicas para cada entidad

  // Grupos
  const groupsApi = {
    getAll: (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString()
      return fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}${queryParams ? `?${queryParams}` : ""}`)
    },
    getById: (id) => fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${id}`),
    create: (data) =>
      fetchApi(API_CONFIG.ENDPOINTS.GROUPS, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${id}`, {
        method: "DELETE",
      }),
    getStudents: (groupId) => fetchApi(`${API_CONFIG.ENDPOINTS.GROUPS}/${groupId}/students`),
  }

  // Docentes
  const teachersApi = {
    getAll: (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString()
      return fetchApi(`${API_CONFIG.ENDPOINTS.TEACHERS}${queryParams ? `?${queryParams}` : ""}`)
    },
    getById: (id) => fetchApi(`${API_CONFIG.ENDPOINTS.TEACHERS}/${id}`),
    create: (data) =>
      fetchApi(API_CONFIG.ENDPOINTS.TEACHERS, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.TEACHERS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      fetchApi(`${API_CONFIG.ENDPOINTS.TEACHERS}/${id}`, {
        method: "DELETE",
      }),
  }

  // Estudiantes
  const studentsApi = {
    getAll: (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString()
      return fetchApi(`${API_CONFIG.ENDPOINTS.STUDENTS}${queryParams ? `?${queryParams}` : ""}`)
    },
    getById: (id) => fetchApi(`${API_CONFIG.ENDPOINTS.STUDENTS}/${id}`),
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

// Datos mock para desarrollo
const mockData = {
  groups: [
    { id: "1", name: "Grupo A", subject: "Matemáticas", teacher: "Juan Pérez", students: 25, status: "Activo" },
    { id: "2", name: "Grupo B", subject: "Física", teacher: "María López", students: 20, status: "Activo" },
    { id: "3", name: "Grupo C", subject: "Química", teacher: "Carlos Rodríguez", students: 18, status: "Inactivo" },
  ],
  teachers: [
    { id: "1", name: "Juan Pérez", email: "juan.perez@example.com", department: "Matemáticas", status: "Activo" },
    { id: "2", name: "María López", email: "maria.lopez@example.com", department: "Física", status: "Activo" },
    {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      department: "Química",
      status: "Inactivo",
    },
  ],
  students: [
    { id: "1", name: "Ana García", email: "ana.garcia@example.com", group: "Grupo A - Matemáticas", status: "Activo" },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      group: "Grupo A - Matemáticas",
      status: "Activo",
    },
    {
      id: "3",
      name: "María Rodríguez",
      email: "maria.rodriguez@example.com",
      group: "Grupo B - Física",
      status: "Inactivo",
    },
  ],
  attendance: {
    history: [
      { id: "1", date: "2025-03-15", group: "Grupo A", present: 22, absent: 3, total: 25 },
      { id: "2", date: "2025-03-14", group: "Grupo B", present: 18, absent: 2, total: 20 },
    ],
  },
}

