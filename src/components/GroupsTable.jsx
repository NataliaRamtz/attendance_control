"use client"

import React, { useState } from "react"
import { Table, Modal, Button, Badge, Dropdown, Form, Col, Row } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react"
import { useApi } from "../contexts/ApiContext"


const initialGroups = [
  { id: "1", name: "8A", teacher: "Maria",students: "20", status: "Activo" },
  { id: "2", name: "8B", teacher: "Juan",students: "20", status: "Activo" },
  { id: "3", name: "8C", teacher: "Pedro",students: "20", status: "Inactivo" },
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

export function GroupsTable({  onEdit, onDelete, onRefresh }) {
  const [groups, setGroups] = useState(initialGroups)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentGroup, setCurrentGroup] = useState(null)
  const { groups: groupsApi } = useApi()
  const [formData, setFormData] = useState({
      name: "",
      teacher: "",
      students: "",
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
  const handleEdit = (group) => {
    setCurrentGroup(group)
    setFormData({
      name: group.name,
      teacher: group.teacher,
      students: group.students,
      status: group.status,
    })
    setShowEditModal(true)
  }

  

  // Abrir modal de eliminación
  const handleDeleteClick = (group) => {
    setCurrentGroup(group)
    setShowDeleteModal(true)
  }

  // Confirmar eliminación
  const handleDelete = async () => {
    /*if (currentGroup) {
      try {
        await groupsApi.delete(currentGroup.id)
        setShowDeleteModal(false)
        setCurrentGroup(null)
        if (onRefresh) onRefresh()
        alert("Grupo eliminado correctamente")
      } catch (error) {
        alert("Error al eliminar el grupo")
      }
    }*/
      if (currentGroup) {
        setGroups(groups.filter((group) => group.id !== currentGroup.id))
        setShowDeleteModal(false)
        setCurrentGroup(null)
        alert("Grupo eliminado correctamente")
      }
  }
  // Guardar cambios
  const handleSaveChanges = () => {
    // Validación básica
    if (!formData.name || !formData.teacher) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    if (currentGroup) {
      setGroups(groups.map((group) => (group.id === currentGroup.id ? { ...group, ...formData } : group)))
      setShowEditModal(false)
      setCurrentGroup(null)

      alert("Grupo actualizado correctamente")
    }
  }

  return (
    <>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              {/*<th>Materia</th>*/}
              <th>Docente</th>
              <th>Alumnos</th>
              <th>Estado</th>
              <th style={{ width: "80px" }}></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="fw-medium">{group.name}</td>
                {/*<td>{group.subject}</td>*/}
                <td>{group.teacher}</td>
                <td>{group.students}</td>
                <td>
                  <Badge bg={group.status === "Activo" ? "success" : "danger"} className="px-2 py-1">
                    {group.status}
                  </Badge>
                </td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle as={CustomToggle} id={`dropdown-${group.id}`}>
                      <MoreHorizontal size={18} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(group)}>
                        <Pencil size={14} className="me-2" />
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteClick(group)}>
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
          <Modal.Title>Editar Grupo</Modal.Title>
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
                  <Form.Label>Docente</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacher"
                    value={formData.teacher}
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
              <p className="mb-1">¿Estás seguro de que deseas eliminar este grupo?</p>
              {currentGroup && (
                <p className="mb-0 fw-bold">
                  {currentGroup.name} - {currentGroup.subject}
                </p>
              )}
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


