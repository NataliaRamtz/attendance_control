// Configuración centralizada para la API
export const API_CONFIG = {
    // URL base de la API - usar variables de entorno para diferentes entornos
    BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  
    // Tiempo de espera para peticiones (en milisegundos)
    TIMEOUT: 15000,
  
    // Versión de la API (si aplica)
    VERSION: "v1",
  
    // Endpoints específicos
    ENDPOINTS: {
      AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh",
      },
      GROUPS: "/groups",
      TEACHERS: "/teachers",
      STUDENTS: "/students",
      ATTENDANCE: "/attendance",
    },
  }
  
  