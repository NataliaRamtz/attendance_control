"use client"

import { useState, useEffect, useCallback } from "react"
import { useApi } from "../contexts/ApiContext"

/**
 * Hook personalizado para obtener y gestionar datos de la API
 * @param {Function} fetchFunction - Función de la API para obtener datos
 * @param {Array} dependencies - Dependencias para recargar datos
 * @param {Object} initialData - Datos iniciales
 * @returns {Object} - Estado y funciones para gestionar los datos
 */
export function useDataFetching(fetchFunction, dependencies = [], initialData = []) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { loading: apiLoading } = useApi()

  // Función para cargar datos
  const fetchData = useCallback(async () => {
    if (!fetchFunction) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err.message || "Error al cargar datos")
      console.error("Error al cargar datos:", err)
    } finally {
      setIsLoading(false)
    }
  }, [fetchFunction])

  // Cargar datos al montar el componente o cuando cambien las dependencias
  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchFunction])

  // Función para actualizar un elemento en el estado local
  const updateItem = useCallback((id, newData) => {
    setData((prevData) =>
      Array.isArray(prevData) ? prevData.map((item) => (item.id === id ? { ...item, ...newData } : item)) : prevData,
    )
  }, [])

  // Función para eliminar un elemento del estado local
  const removeItem = useCallback((id) => {
    setData((prevData) => (Array.isArray(prevData) ? prevData.filter((item) => item.id !== id) : prevData))
  }, [])

  // Función para añadir un elemento al estado local
  const addItem = useCallback((newItem) => {
    setData((prevData) => (Array.isArray(prevData) ? [...prevData, newItem] : prevData))
  }, [])

  return {
    data,
    setData,
    isLoading: isLoading || apiLoading,
    error,
    refresh: fetchData,
    updateItem,
    removeItem,
    addItem,
  }
}

