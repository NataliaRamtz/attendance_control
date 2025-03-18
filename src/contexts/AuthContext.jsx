"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Crear el contexto de autenticación
const AuthContext = createContext()

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext)

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // En una implementación real, verificarías el token con el backend
          // const response = await fetch(`${API_CONFIG.BASE_URL}/auth/verify`, {
          //   headers: { Authorization: `Bearer ${token}` }
          // })

          // if (response.ok) {
          //   const userData = await response.json()
          //   setUser(userData)
          // } else {
          //   // Token inválido, limpiar estado
          //   handleLogout()
          // }

          // Simulación para desarrollo
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        } catch (err) {
          setError("Error al verificar autenticación")
          handleLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [token])

  // Iniciar sesión
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      // En una implementación real, harías una petición al backend
      // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })

      // if (!response.ok) throw new Error('Credenciales inválidas')
      // const data = await response.json()

      // Simulación para desarrollo
      await new Promise((resolve) => setTimeout(resolve, 800))

      let userData = null
      let userToken = null

      if (email === "admin@example.com" && password === "password") {
        userData = { id: 1, name: "Admin", role: "admin" }
        userToken = "admin-token-123"
      } else if (email === "teacher@example.com" && password === "password") {
        userData = { id: 2, name: "Profesor", role: "teacher" }
        userToken = "teacher-token-456"
      } else {
        throw new Error("Credenciales inválidas")
      }

      // Guardar datos en localStorage
      localStorage.setItem("token", userToken)
      localStorage.setItem("user", JSON.stringify(userData))

      // Actualizar estado
      setToken(userToken)
      setUser(userData)

      // Redireccionar según rol
      navigate(userData.role === "admin" ? "/admin/dashboard" : "/teacher/dashboard")

      return userData
    } catch (err) {
      setError(err.message || "Error al iniciar sesión")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Cerrar sesión
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Limpiar estado
    setToken(null)
    setUser(null)

    // Redireccionar a login
    navigate("/login")
  }

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user && user.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout: handleLogout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

