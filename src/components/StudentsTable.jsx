"use client"

import React, { useState } from "react"
import { Table, Modal, Form, Row, Col, Button, Badge, Dropdown } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react"

// Mock data inicial
const initialStudents = [
  { id: "1", name: "Ana García", matricula: "12345001", status: "Activo" },
  { id: "2", name: "Carlos López", matricula: "12345002", status: "Activo" },
  { id: "3", name: "María Rodríguez", matricula: "12345003", status: "Inactivo" },
  { id: "4", name: "Juan Pérez", matricula: "12345004", status: "Activo" },
  { id: "5", name: "Laura Martínez", matricula: "12345005", status: "Activo" },
]

// Componente personalizado para el botón del dropdown
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant="light"
    size="sm"
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
    className="border-0"
  >
    {children}
  </Button>
))

export function StudentsTable() {
  const [students, setStudents] = useState(initialStudents)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    status: "Activo",
  })

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Abrir modal de edición
  const handleEdit = (student) => {
    setCurrentStudent(student)
    setFormData({
      name: student.name,
      matricula: student.matricula,
      status: student.status,
    })
    setShowEditModal(true)
  }

  // Abrir modal de eliminación
  const handleDeleteClick = (student) => {
    setCurrentStudent(student)
    setShowDeleteModal(true)
  }

  // Confirmar eliminación
  const handleDelete = () => {
    if (currentStudent) {
      setStudents(students.filter((student) => student.id !== currentStudent.id))
      setShowDeleteModal(false)
      setCurrentStudent(null)
      alert("Alumno eliminado correctamente")
    }
  }

  // Guardar cambios
  const handleSaveChanges = () => {
    // Validación básica
    if (!formData.name || !formData.matricula) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    if (currentStudent) {
      setStudents(students.map((student) => (student.id === currentStudent.id ? { ...student, ...formData } : student)))
      setShowEditModal(false)
      setCurrentStudent(null)

      alert("Alumno actualizado correctamente")
    }
  }

  return (
    <>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Matricula</th>
              <th>Estado</th>
              <th style={{ width: "80px" }}></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="fw-medium">{student.name}</td>
                <td>{student.matricula}</td>
                <td>
                  <Badge bg={student.status === "Activo" ? "success" : "danger"} className="px-2 py-1">
                    {student.status}
                  </Badge>
                </td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle as={CustomToggle} id={`dropdown-${student.id}`}>
                      <MoreHorizontal size={18} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(student)}>
                        <Pencil size={14} className="me-2" />
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteClick(student)}>
                        <Trash size={14} className="me-2" />
                        Eliminar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matricula</Form.Label>
                  <Form.Control
                    type="text"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <AlertCircle size={24} className="text-danger me-3" />
            <div>
              <p className="mb-1">¿Estás seguro de que deseas eliminar a este alumno?</p>
              {currentStudent && <p className="mb-0 fw-bold">{currentStudent.name}</p>}
              <p className="text-muted small mt-2 mb-0">Esta acción no se puede deshacer.</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

