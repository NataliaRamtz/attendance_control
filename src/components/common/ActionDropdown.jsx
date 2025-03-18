"use client"

import React from "react"
import { Dropdown, Button } from "react-bootstrap"
import { MoreHorizontal, Pencil, Trash, Users, Eye } from "lucide-react"

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

/**
 * Dropdown de acciones reutilizable para tablas
 */
export function ActionDropdown({ id, onEdit, onDelete, onView, onViewStudents, align = "end" }) {
  return (
    <Dropdown align={align}>
      <Dropdown.Toggle as={CustomToggle} id={`dropdown-${id}`}>
        <MoreHorizontal size={18} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {onEdit && (
          <Dropdown.Item onClick={onEdit}>
            <Pencil size={14} className="me-2" />
            Editar
          </Dropdown.Item>
        )}
        {onView && (
          <Dropdown.Item onClick={onView}>
            <Eye size={14} className="me-2" />
            Ver Detalles
          </Dropdown.Item>
        )}
        {onViewStudents && (
          <Dropdown.Item onClick={onViewStudents}>
            <Users size={14} className="me-2" />
            Ver Alumnos
          </Dropdown.Item>
        )}
        {onDelete && (
          <Dropdown.Item onClick={onDelete}>
            <Trash size={14} className="me-2" />
            Eliminar
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

