"use client"

import React, { useState, useEffect } from "react"
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

// Contexto para el sistema de toasts
export const ToastContext = React.createContext({
  showToast: () => {},
})

// Proveedor del contexto
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type, duration }])

    // Eliminar automáticamente después de la duración
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

// Hook para usar el contexto
export function useToast() {
  return React.useContext(ToastContext)
}

// Componente Toast
function Toast({ message, type = "success", onClose }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
  }, [message])

  const handleClose = () => {
    setShow(false)
    if (onClose) onClose()
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-success" />
      case "error":
        return <AlertCircle size={20} className="text-danger" />
      case "info":
        return <Info size={20} className="text-info" />
      default:
        return <Info size={20} className="text-info" />
    }
  }

  const getBgClass = () => {
    switch (type) {
      case "success":
        return "bg-success bg-opacity-10"
      case "error":
        return "bg-danger bg-opacity-10"
      case "info":
        return "bg-info bg-opacity-10"
      default:
        return "bg-light"
    }
  }

  return (
    <BootstrapToast show={show} onClose={handleClose} className={getBgClass()}>
      <BootstrapToast.Header closeButton>
        <div className="me-auto d-flex align-items-center">
          {getIcon()}
          <span className="ms-2 fw-medium">
            {type === "success" ? "Éxito" : type === "error" ? "Error" : "Información"}
          </span>
        </div>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{message}</BootstrapToast.Body>
    </BootstrapToast>
  )
}

