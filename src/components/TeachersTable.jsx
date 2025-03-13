"use client"

import React from "react"

import { useState } from "react"
import { Table, Dropdown, Button } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

// Mock data
const teachers = [
  { id: "1", name: "Juan Pérez", email: "juan.perez@example.com", department: "Matemáticas", status: "Activo" },
  { id: "2", name: "María López", email: "maria.lopez@example.com", department: "Física", status: "Activo" },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    department: "Química",
    status: "Inactivo",
  },
  { id: "4", name: "Ana Martínez", email: "ana.martinez@example.com", department: "Biología", status: "Activo" },
]

export function TeachersTable() {
  const [teachersList, setTeachersList] = useState(teachers)

  const handleDelete = (id) => {
    setTeachersList(teachersList.filter((teacher) => teacher.id !== id))
  }

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Departamento</th>
            <th>Estado</th>
            <th style={{ width: "80px" }}></th>
          </tr>
        </thead>
        <tbody>
          {teachersList.map((teacher) => (
            <tr key={teacher.id}>
              <td className="fw-medium">{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.department}</td>
              <td>
                <span className={`status-badge ${teacher.status === "Activo" ? "status-active" : "status-inactive"}`}>
                  {teacher.status}
                </span>
              </td>
              <td>
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle} id={`dropdown-${teacher.id}`}>
                    <MoreHorizontal size={18} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Pencil size={14} className="me-2" />
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(teacher.id)}>
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
  )
}

// Custom dropdown toggle to avoid default Bootstrap styling
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

