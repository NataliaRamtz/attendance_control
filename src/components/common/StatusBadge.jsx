import { Badge } from "react-bootstrap"

/**
 * Componente para mostrar badges de estado consistentes en toda la aplicación
 */
export function StatusBadge({ status, type = "default" }) {
  // Para estados de activo/inactivo
  if (type === "default") {
    return (
      <Badge bg={status === "Activo" ? "success" : "danger"} className="px-2 py-1">
        {status}
      </Badge>
    )
  }

  // Para estados de asistencia
  if (type === "attendance") {
    switch (status) {
      case "present":
        return <Badge bg="success">Presente</Badge>
      case "absent":
        return <Badge bg="danger">Ausente</Badge>
      case "late":
        return <Badge bg="warning">Retardo</Badge>
      case "justified":
        return <Badge bg="info">Justificado</Badge>
      default:
        return <Badge bg="secondary">Desconocido</Badge>
    }
  }

  // Para porcentajes de asistencia
  if (type === "percentage") {
    const percentage = Number.parseInt(status)
    let bg = "danger"
    if (percentage >= 85) bg = "success"
    else if (percentage >= 75) bg = "warning"

    return <Badge bg={bg}>{status}%</Badge>
  }

  return <Badge bg="secondary">{status}</Badge>
}

