"use client"

import { useState } from "react"
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { StudentsTable } from "../components/StudentsTable"
import { Plus, Search } from "lucide-react"

function AdminStudents({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    group: "",
    age: "",
    gender: "",
    status: "Activo",
  })
  

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el nuevo alumno
    console.log("Nuevo docente:", formData)
    setShowModal(false)
    // Resetear el formulario
    setFormData({
      name: "",
      matricula: "",
      group: "",
      age: "",
      gender: "",
      status: "Activo",
    })
  }

  return (
    <DashboardLayout userRole="admin" onLogout={onLogout}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Alumnos</h2>
        {/*<Button variant="primary">
          <Plus size={16} className="me-2" />
          Agregar Alumno
        </Button>*/}
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
            {/*<Col lg={8} className="d-flex justify-content-lg-end mt-3 mt-lg-0">
              <div className="d-flex gap-2">
                <Button variant="outline-secondary">Exportar</Button>
                <Button variant="outline-secondary">Imprimir</Button>
              </div>
            </Col>*/}
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
      {/* Modal para agregar nuevo alumno  */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
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
                  <Form.Label>Grupo</Form.Label>
                  <Form.Control type="text" name="group" value={formData.group} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="text"
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
                  <Form.Label>Genero</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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