import { Card, Table, Badge, Button, Dropdown } from "react-bootstrap"
import { MoreHorizontal, Users } from "lucide-react"
import { DashboardLayout } from "../components/DashboardLayout"
import React from "react"

// Mock data
const teacherGroups = [
  { id: "1", name: "Grupo A"/*, subject: "Matemáticas"*/, students: 25/*, schedule: "Lunes y Miércoles 10:00 - 12:00"*/ },
  { id: "2", name: "Grupo B"/*, subject: "Física"*/, students: 20/*, schedule: "Martes y Jueves 08:00 - 10:00"*/ },
  { id: "3", name: "Grupo C"/*, subject: "Química"*/, students: 18/*, schedule: "Viernes 14:00 - 18:00"*/ },
]

function TeacherGroups({ onLogout }) {
  return (
    <DashboardLayout userRole="teacher" onLogout={onLogout}>
      <h2 className="mb-4">Mis Grupos</h2>

      <Card>
        <Card.Header>
          <Card.Title>Grupos Asignados</Card.Title>
          <Card.Subtitle className="text-muted">Lista de grupos a tu cargo</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  {/*<th>Materia</th>*/}
                  <th>Alumnos</th>
                  {/*<th>Horario</th>
                  <th>Asistencia</th>*/}
                  <th style={{ width: "80px" }}></th>
                </tr>
              </thead>
              <tbody>
                {teacherGroups.map((group) => (
                  <tr key={group.id}>
                    <td className="fw-medium">{group.name}</td>
                    {/*<td>{group.subject}</td>*/}
                    <td>{group.students}</td>
                    {/*<td>{group.schedule}</td>*/}
                    {/*<td>
                      <Badge bg="success" className="me-1">
                        85%
                      </Badge>
                      <span className="text-muted small">Promedio</span>
                    </td>*/}
                    <td>
                        <Dropdown align="end">
                        <Dropdown.Toggle as={CustomToggle} id={`dropdown-${group.id}`}>
                            <MoreHorizontal size={18} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            <Users size={14} className="me-2" />
                            Ver alumnos
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </DashboardLayout>
  )
}

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

export default TeacherGroups


