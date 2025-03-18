"use client"
import { Modal, Button } from "react-bootstrap"
import { AlertCircle } from "lucide-react"

/**
 * Modal de confirmación reutilizable para acciones como eliminación
 */
export function ConfirmationModal({
  show,
  onHide,
  onConfirm,
  title = "Confirmar Acción",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmVariant = "danger",
  icon = <AlertCircle size={24} className="text-danger me-3" />,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          {icon}
          <div>
            <p className="mb-1">{message}</p>
            <p className="text-muted small mt-2 mb-0">Esta acción no se puede deshacer.</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

