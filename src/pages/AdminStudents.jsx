"use client"

import { useState } from "react"
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { StudentsTable } from "../components/StudentsTable"
import { Plus, Search } from "lucide-react"
import { useApi } from "../contexts/ApiContext"

function AdminStudents({ onLogout }) {
  const { students } = useApi()
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    group: "",
    age: "",
    gender: "",
  })

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Enviar formulario para crear un nuevo estudiante
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await students.create(formData)
      setShowModal(false)
      setFormData({
        name: "",
        email: "",
        group: "",
        age: "",
        gender: "",
      })
      alert("Estudiante creado correctamente")
    } catch (error) {
      console.error("Error creando estudiante:", error)
      alert("Error al crear el estudiante")
    }
  }

  return (
    <DashboardLayout userRole="admin" onLogout={onLogout}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Alumnos</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={16} className="me-2" />
          Agregar Alumno
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group className="mb-3 mb-md-0">
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar alumnos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                    <Search size={18} className="text-muted" />
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Lista de Alumnos</Card.Title>
          <Card.Subtitle className="text-muted">Administra los alumnos registrados</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <StudentsTable />
        </Card.Body>
      </Card>

      {/* Modal para agregar nuevo alumno */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Alumno
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default AdminStudents