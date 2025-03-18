export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "https://assistance-back.onrender.com",
  TIMEOUT: 15000,
  VERSION: "v1",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/login",
      VERIFY: "/api/auth/verify", // Nueva ruta
      REGISTER: "/api/auth/register", // Añade este endpoint para registrar usuarios
      GET_USERS: "/api/auth/users", // Endpoint para obtener usuarios (profesores)
      UPDATE_USER: "/api/auth/users", // Endpoint para actualizar usuarios
      DELETE_USER: "/api/auth/users", // Endpoint para eliminar usuarios
    },
    GROUPS: "/groups",
    STUDENTS: "/api/students/students",
    ATTENDANCE: "/api/attendance",
  },
};