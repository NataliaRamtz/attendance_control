"use client"

import { useState } from "react"
import { Card, Button, Row, Col, Form, Modal, Alert, Spinner } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { GroupsTable } from "../components/GroupsTable"
import { Plus, Search } from "lucide-react"
import { useApi } from "../contexts/ApiContext"
import { useDataFetching } from "../hooks/useDataFetching"

// Listas para selects (en una implementación real, estas vendrían del backend)
//const availableTeachers = ["Juan Pérez", "María López", "Carlos Rodríguez", "Ana Martínez"]

function AdminGroups({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    students: "",
    status: "Activo",
  })

  const { groups: groupsApi, error: apiError } = useApi()

  // Usar el hook personalizado para obtener y gestionar los grupos
  const {
    data: groups,
    isLoading,
    error,
    refresh: refreshGroups,
    updateItem,
    removeItem,
    addItem,
  } = useDataFetching(() => groupsApi.getAll())

  // Filtrar grupos por término de búsqueda
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEdit = (group) => {
    setEditingGroup(group)
    setFormData({
      name: group.name,
      teacher: group.teacher,
      status: group.status,
    })
    setShowModal(true)
  }

  const handleDelete = async (groupId) => {
    try {
      await groupsApi.delete(groupId)
      removeItem(groupId)
      alert("Grupo eliminado correctamente")
    } catch (error) {
      alert("Error al eliminar el grupo")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el nuevo alumno
    console.log("Nuevo grupo:", formData)
    setShowModal(false)
    // Resetear el formulario
    setFormData({
      name: "",
    teacher: "",
    students: "",
    status: "Activo",
    })
  }
  const resetForm = () => {
    setFormData({
      name: "",
      teacher: "",
      status: "Activo",
    })
    setEditingGroup(null)
    setShowModal(false)
  }

  return (
    <DashboardLayout userRole="admin" onLogout={onLogout}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Grupos</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={16} className="me-2" />
          Crear Grupo
        </Button>
      </div>

      {(error || apiError) && (
        <Alert variant="danger" className="mb-4">
          {error || apiError}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group className="mb-3 mb-md-0">
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar grupos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                    <Search size={18} className="text-muted" />
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={8} className="d-flex justify-content-lg-end mt-3 mt-lg-0">
              <Button variant="outline-secondary" onClick={refreshGroups}>
                Actualizar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Lista de Grupos</Card.Title>
          <Card.Subtitle className="text-muted">Administra los grupos</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p className="mt-2">Cargando grupos...</p>
            </div>
          ) : (
            <GroupsTable groups={filteredGroups} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Card.Body>
      </Card>

      {/* Modal para crear/editar grupo */}
      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editingGroup ? "Editar Grupo" : "Crear Nuevo Grupo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Grupo</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Docente</Form.Label>
                  <Form.Control type="text" name="teacher" value={formData.teacher} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Numero de Alumnos</Form.Label>
                  <Form.Control type="text" name="students" value={formData.students} onChange={handleInputChange} required />
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
          <Button variant="secondary" onClick={resetForm}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingGroup ? "Guardar Cambios" : "Crear Grupo"}
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default AdminGroups

