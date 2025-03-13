"use client"
import { Button } from "react-bootstrap"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={theme === "dark" ? "outline-light" : "outline-dark"}
      size="sm"
      onClick={toggleTheme}
      className="d-flex align-items-center"
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="ms-2 d-none d-md-inline">{theme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
    </Button>
  )
}

