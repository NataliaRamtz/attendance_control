"use client"

import React, { useState, useEffect } from "react"
import { Table, Modal, Form, Row, Col, Button, Badge, Dropdown } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react"
import { useApi } from "../contexts/ApiContext"

export function StudentsTable() {
  const { students } = useApi()
  const [studentsList, setStudentsList] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    group: "",
    age: "",
    gender: "",
  })

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await students.getAll()
        setStudentsList(data)
      } catch (error) {
        console.error("Error cargando estudiantes:", error)
      }
    }
    loadStudents()
  }, [])

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
      email: student.email,
      group: student.group,
      age: student.age,
      gender: student.gender,
    })
    setShowEditModal(true)
  }

  // Abrir modal de eliminación
  const handleDeleteClick = (student) => {
    setCurrentStudent(student)
    setShowDeleteModal(true)
  }

  // Guardar cambios en la edición
  const handleSaveChanges = async () => {
    if (!formData.name || !formData.email) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    try {
      await students.update(currentStudent._id, formData)
      
      setStudentsList(prev => 
        prev.map(student => 
          student._id === currentStudent._id ? { ...student, ...formData } : student
        )
      )
      
      setShowEditModal(false)
      setCurrentStudent(null)
      alert("Estudiante actualizado correctamente")
    } catch (error) {
      console.error("Error actualizando estudiante:", error)
      alert("Error al actualizar el estudiante")
    }
  }

  // Eliminar estudiante
  const handleDelete = async () => {
    if (currentStudent) {
      try {
        await students.delete(currentStudent._id)
        
        setStudentsList(prev => 
          prev.filter(student => student._id !== currentStudent._id)
        )
        
        setShowDeleteModal(false)
        setCurrentStudent(null)
        alert("Estudiante eliminado correctamente")
      } catch (error) {
        console.error("Error eliminando estudiante:", error)
        alert("Error al eliminar el estudiante")
      }
    }
  }

  return (
    <>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Grupo</th>
              <th>Edad</th>
              <th>Género</th>
              <th style={{ width: "80px" }}></th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr key={student._id}>
                <td className="fw-medium">{student.name}</td>
                <td>{student.email}</td>
                <td>{student.group}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="light" size="sm" className="border-0">
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Grupo</Form.Label>
                  <Form.Control
                    type="text"
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
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
              <p className="mb-1">¿Estás seguro de que deseas eliminar este estudiante?</p>
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