/**
 * Utilidades para manipulación de datos
 */

// Formatear fecha para mostrar en la UI
export function formatDate(dateString) {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Calcular porcentaje de asistencia
export function calculateAttendancePercentage(present, total) {
  if (!total) return 0
  return Math.round((present / total) * 100)
}

// Filtrar datos por término de búsqueda
export function filterBySearchTerm(data, searchTerm, fields = ["name"]) {
  if (!searchTerm) return data

  const term = searchTerm.toLowerCase()
  return data.filter((item) => {
    return fields.some((field) => {
      return item[field] && item[field].toLowerCase().includes(term)
    })
  })
}

// Mostrar notificación (simple alert, podría reemplazarse por un sistema de toasts)
export function showNotification(message, type = "success") {
  alert(message)
}

