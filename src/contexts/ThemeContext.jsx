"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Crear el contexto
const ThemeContext = createContext()

// Hook personalizado para usar el contexto
export const useTheme = () => useContext(ThemeContext)

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // Verificar si hay una preferencia guardada en localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme
    }
    // Si el usuario prefiere el modo oscuro en su sistema
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Cambiar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // Aplicar el tema al documento y guardar en localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

