"use client";

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react";
import { useApi } from "../contexts/ApiContext";

export function TeachersTable() {
  const { teachers } = useApi(); // Usa el contexto de la API
  const [teachersList, setTeachersList] = useState([]); // Estado para almacenar los profesores
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Activo",
  });

  // Cargar profesores al montar el componente
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await teachers.getAll(); // Obtener profesores desde el backend
        setTeachersList(data);
      } catch (error) {
        console.error("Error cargando docentes:", error);
      }
    };

    loadTeachers();
  }, []);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para abrir el modal de edición
  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      status: teacher.status,
    });
    setShowEditModal(true);
  };

  // Función para abrir el modal de eliminación
  const handleDeleteClick = (teacher) => {
    setCurrentTeacher(teacher);
    setShowDeleteModal(true);
  };

  // Función para guardar cambios en la edición
  const handleSaveChanges = async () => {
    if (!formData.name || !formData.email) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      if (currentTeacher) {
        // Actualizar el profesor en el backend
        await teachers.update(currentTeacher._id, formData);

        // Actualizar el estado local
        setTeachersList((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher._id === currentTeacher._id ? { ...teacher, ...formData } : teacher
          )
        );

        setShowEditModal(false);
        setCurrentTeacher(null);
        alert("Docente actualizado correctamente");
      }
    } catch (error) {
      console.error("Error actualizando docente:", error);
      alert("Hubo un error al actualizar el docente");
    }
  };

  // Función para eliminar un profesor
  const handleDelete = async () => {
    if (currentTeacher) {
      try {
        // Eliminar el profesor en el backend
        await teachers.delete(currentTeacher._id);

        // Actualizar el estado local
        setTeachersList((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== currentTeacher._id)
        );

        setShowDeleteModal(false);
        setCurrentTeacher(null);
        alert("Docente eliminado correctamente");
      } catch (error) {
        console.error("Error eliminando docente:", error);
        alert("Hubo un error al eliminar el docente");
      }
    }
  };

  return (
    <>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th style={{ width: "80px" }}></th>
            </tr>
          </thead>
          <tbody>
            {teachersList.map((teacher) => (
              <tr key={teacher._id}>
                <td className="fw-medium">{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>
                  <Badge bg={teacher.status === "Activo" ? "success" : "danger"} className="px-2 py-1">
                    {teacher.status}
                  </Badge>
                </td>
                <td>
                  <div className="dropdown">
                    <Button
                      variant="light"
                      size="sm"
                      className="border-0"
                      onClick={(e) => {
                        e.preventDefault();
                        const dropdown = e.currentTarget.nextElementSibling;
                        dropdown.classList.toggle("show");
                      }}
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                    <div className="dropdown-menu dropdown-menu-end">
                      <button className="dropdown-item" onClick={() => handleEdit(teacher)}>
                        <Pencil size={14} className="me-2" />
                        Editar
                      </button>
                      <button className="dropdown-item" onClick={() => handleDeleteClick(teacher)}>
                        <Trash size={14} className="me-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Docente</Modal.Title>
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
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
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
              <p className="mb-1">¿Estás seguro de que deseas eliminar a este docente?</p>
              {currentTeacher && <p className="mb-0 fw-bold">{currentTeacher.name}</p>}
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
  );
}