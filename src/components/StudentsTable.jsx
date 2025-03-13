"use client"

import React from "react"

import { useState } from "react"
import { Table, Dropdown, Button } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

// Mock data
const students = [
  { id: "1", name: "Ana García", email: "ana.garcia@example.com", group: "Grupo A - Matemáticas", status: "Activo" },
  {
    id: "2",
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    group: "Grupo A - Matemáticas",
    status: "Activo",
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria.rodriguez@example.com",
    group: "Grupo A - Matemáticas",
    status: "Inactivo",
  },
  { id: "4", name: "Juan Pérez", email: "juan.perez@example.com", group: "Grupo B - Física", status: "Activo" },
  { id: "5", name: "Laura Martínez", email: "laura.martinez@example.com", group: "Grupo B - Física", status: "Activo" },
]

export function StudentsTable() {
  const [studentsList, setStudentsList] = useState(students)

  const handleDelete = (id) => {
    setStudentsList(studentsList.filter((student) => student.id !== id))
  }

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Grupo</th>
            <th>Estado</th>
            <th style={{ width: "80px" }}></th>
          </tr>
        </thead>
        <tbody>
          {studentsList.map((student) => (
            <tr key={student.id}>
              <td className="fw-medium">{student.name}</td>
              <td>{student.email}</td>
              <td>{student.group}</td>
              <td>
                <span className={`status-badge ${student.status === "Activo" ? "status-active" : "status-inactive"}`}>
                  {student.status}
                </span>
              </td>
              <td>
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle} id={`dropdown-${student.id}`}>
                    <MoreHorizontal size={18} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Pencil size={14} className="me-2" />
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(student.id)}>
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

