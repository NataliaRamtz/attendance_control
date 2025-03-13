"use client"

import React from "react"

import { useState } from "react"
import { Table, Dropdown, Button } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash, Users } from "lucide-react"

// Mock data
const groups = [
  { id: "1", name: "Grupo A", subject: "Matemáticas", teacher: "Juan Pérez", students: 25, status: "Activo" },
  { id: "2", name: "Grupo B", subject: "Física", teacher: "María López", students: 20, status: "Activo" },
  { id: "3", name: "Grupo C", subject: "Química", teacher: "Carlos Rodríguez", students: 18, status: "Inactivo" },
]

export function GroupsTable() {
  const [groupsList, setGroupsList] = useState(groups)

  const handleDelete = (id) => {
    setGroupsList(groupsList.filter((group) => group.id !== id))
  }

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Docente</th>
            <th>Alumnos</th>
            <th>Estado</th>
            <th style={{ width: "80px" }}></th>
          </tr>
        </thead>
        <tbody>
          {groupsList.map((group) => (
            <tr key={group.id}>
              <td className="fw-medium">{group.name}</td>
              <td>{group.subject}</td>
              <td>{group.teacher}</td>
              <td>{group.students}</td>
              <td>
                <span className={`status-badge ${group.status === "Activo" ? "status-active" : "status-inactive"}`}>
                  {group.status}
                </span>
              </td>
              <td>
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle} id={`dropdown-${group.id}`}>
                    <MoreHorizontal size={18} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Pencil size={14} className="me-2" />
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Users size={14} className="me-2" />
                      Ver alumnos
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(group.id)}>
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

