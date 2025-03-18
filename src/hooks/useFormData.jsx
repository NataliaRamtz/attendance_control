"use client"

import { useState } from "react"

/**
 * Hook personalizado para manejar formularios
 * @param {Object} initialData - Datos iniciales del formulario
 * @returns {Object} - Estado del formulario y funciones para manipularlo
 */
export function useFormData(initialData = {}) {
  const [formData, setFormData] = useState(initialData)

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Resetear el formulario a los valores iniciales o a nuevos valores
  const resetForm = (newData = initialData) => {
    setFormData(newData)
  }

  // Validar que los campos requeridos no estén vacíos
  const validateRequiredFields = (requiredFields = []) => {
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false
      }
    }
    return true
  }

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    validateRequiredFields,
  }
}

