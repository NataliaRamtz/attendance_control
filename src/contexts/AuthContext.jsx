import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API_CONFIG } from "../config/api.config"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token")

      if (storedToken) {
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY}`, {
            headers: { Authorization: storedToken }
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            handleLogout()
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
  }, [])

  // Iniciar sesión
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      // Paso 1: Iniciar sesión y obtener el token
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) throw new Error('Credenciales inválidas')
      const data = await response.json()

      // Guardar token en localStorage
      localStorage.setItem("token", data.token)

      // Paso 2: Obtener información del usuario usando la ruta verify
      const verifyResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY}`, {
        headers: { Authorization: data.token }
      })

      if (!verifyResponse.ok) throw new Error('Error al obtener información del usuario')
      const userData = await verifyResponse.json()

      // Paso 3: Manejar el rol del usuario
      const userRole = userData.role === "user" ? "teacher" : userData.role

      // Guardar información del usuario en localStorage
      localStorage.setItem("user", JSON.stringify({ ...userData, role: userRole }))

      // Actualizar estado
      setToken(data.token)
      setUser({ ...userData, role: userRole })

      // Redireccionar según el rol
      navigate(userRole === "admin" ? "/admin/dashboard" : "/teacher/dashboard")

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
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)

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