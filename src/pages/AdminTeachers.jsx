"use client"

import { useState } from "react"
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { TeachersTable } from "../components/TeachersTable"
import { SearchFilter } from "../components/common/SearchFilter"
import { Plus } from "lucide-react"
import { useApi } from "../contexts/ApiContext";

function AdminTeachers({ onLogout }) {
  const { teachers } = useApi();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Activo",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await teachers.create({
        name: formData.name,
        email: formData.email,
        password: "password", // Contraseña temporal
        status: formData.status,
      });
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        status: "Activo",
      });
      // Recargar la lista de profesores
    } catch (error) {
      console.error("Error creando docente:", error);
    }
  };


  

  return (
    <DashboardLayout userRole="admin" onLogout={onLogout}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Docentes</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={16} className="me-2" />
          Agregar Docente
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar docentes..."
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Lista de Docentes</Card.Title>
          <Card.Subtitle className="text-muted">Administra los docentes registrados</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <TeachersTable />
        </Card.Body>
      </Card>

      {/* Modal para agregar nuevo docente */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Docente</Modal.Title>
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
                  <Form.Label>Correo Electrónico</Form.Label>
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
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña Temporal</Form.Label>
                  <Form.Control type="text" placeholder="Generada automáticamente" readOnly value="password" />
                  <Form.Text className="text-muted">
                    El docente deberá cambiarla en su primer inicio de sesión
                  </Form.Text>
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
            Guardar Docente
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default AdminTeachers

