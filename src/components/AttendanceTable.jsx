"use client"

import { useState, useEffect } from "react"
import { Table, Form, Button, Modal } from "react-bootstrap"
import { Save, Edit, CheckCircle } from "lucide-react"
import { StatusBadge } from "./common/StatusBadge"
import { ConfirmationModal } from "./common/ConfirmationModal"
import { showNotification } from "../utils/dataUtils"

export function AttendanceTable({ students, date }) {
  const [attendance, setAttendance] = useState({})
  const [editMode, setEditMode] = useState(true) // Inicialmente en modo edición
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [justification, setJustification] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Inicializar asistencia con valores aleatorios para demostración
  useEffect(() => {
    const statuses = ["present", "absent", "late", "justified"]
    const initialAttendance = {}

    students.forEach((student) => {
      // Para demostración, asignar un estado aleatorio a estudiantes existentes
      if (editMode) {
        initialAttendance[student.id] = ""
      } else {
        const randomIndex = Math.floor(Math.random() * statuses.length)
        initialAttendance[student.id] = statuses[randomIndex]
      }
    })

    setAttendance(initialAttendance)
  }, [students, editMode])

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSaveAttendance = () => {
    // Verificar que todos los estudiantes tengan un estado asignado
    const missingAttendance = students.some((student) => !attendance[student.id])

    if (missingAttendance) {
      showNotification("Por favor registre la asistencia de todos los estudiantes", "error")
      return
    }

    // Aquí iría la lógica para guardar la asistencia en el backend
    setEditMode(false)
    setShowSaveModal(true)

    // Simular guardado exitoso
    setTimeout(() => {
      setSaveSuccess(true)
    }, 1000)
  }

  const handleEditAttendance = () => {
    setEditMode(true)
    setShowEditModal(false)
  }

  const openJustificationModal = (student) => {
    setSelectedStudent(student)
    setJustification("")
    setShowEditModal(true)
  }

  const saveJustification = () => {
    if (selectedStudent) {
      if (!justification.trim()) {
        showNotification("Por favor ingrese un motivo para la justificación", "error")
        return
      }

      // Aquí podrías guardar la justificación en el backend
      handleAttendanceChange(selectedStudent.id, "justified")
      setShowEditModal(false)

      showNotification("Justificación registrada correctamente")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Registro de Asistencia - {date}</h5>
        {!editMode ? (
          <Button variant="outline-primary" size="sm" onClick={() => setShowEditModal(true)}>
            <Edit size={16} className="me-2" />
            Editar Asistencia
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={handleSaveAttendance}>
            <Save size={16} className="me-2" />
            Guardar Asistencia
          </Button>
        )}
      </div>

      <div className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Alumno</th>
              {editMode ? (
                <>
                  <th className="text-center">Presente</th>
                  <th className="text-center">Ausente</th>
                  <th className="text-center">Retardo</th>
                  <th className="text-center">Justificado</th>
                </>
              ) : (
                <>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="fw-medium">{student.name}</td>

                {editMode ? (
                  // Modo edición - mostrar opciones de asistencia
                  <>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === "present"}
                        onChange={() => handleAttendanceChange(student.id, "present")}
                      />
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === "absent"}
                        onChange={() => handleAttendanceChange(student.id, "absent")}
                      />
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === "late"}
                        onChange={() => handleAttendanceChange(student.id, "late")}
                      />
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === "justified"}
                        onChange={() => handleAttendanceChange(student.id, "justified")}
                      />
                    </td>
                    {editMode && !attendance[student.id] && (
                      <span className="text-danger small d-block">* Pendiente</span>
                    )}
                  </>
                ) : (
                  // Modo visualización - mostrar estado actual
                  <>
                    <td className="text-center">
                      <StatusBadge status={attendance[student.id]} type="attendance" />
                    </td>
                    <td className="text-center">
                      {attendance[student.id] === "absent" && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0"
                          onClick={() => openJustificationModal(student)}
                        >
                          Justificar
                        </Button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de Confirmación de Guardado */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Guardar Asistencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            {saveSuccess ? (
              <>
                <CheckCircle size={48} className="text-success mb-3" />
                <h5>¡Asistencia Guardada!</h5>
                <p className="text-muted mb-0">La asistencia ha sido registrada correctamente para la fecha {date}.</p>
              </>
            ) : (
              <>
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Guardando...</span>
                </div>
                <h5>Guardando Asistencia</h5>
                <p className="text-muted mb-0">Por favor espera mientras se guarda la información...</p>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSaveModal(false)} disabled={!saveSuccess}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edición/Justificación */}
      <ConfirmationModal
        show={showEditModal && !selectedStudent}
        onHide={() => setShowEditModal(false)}
        onConfirm={handleEditAttendance}
        title="Editar Asistencia"
        message="¿Estás seguro de que deseas editar la asistencia guardada?"
        confirmLabel="Editar Asistencia"
        confirmVariant="warning"
      />

      {/* Modal de Justificación */}
      <Modal show={showEditModal && !!selectedStudent} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Justificar Inasistencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Registrar justificación para: <strong>{selectedStudent?.name}</strong>
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Motivo de la justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Ingrese el motivo de la justificación..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Documento de respaldo (opcional)</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveJustification}>
            Guardar Justificación
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

