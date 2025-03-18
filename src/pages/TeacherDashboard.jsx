"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { AttendanceTable } from "../components/AttendanceTable"

// Mock data
const groups = [
  { id: "1", name: "Grupo A" },
  { id: "2", name: "Grupo B" },
  { id: "3", name: "Grupo C" },
]

const students = [
  { id: "1", name: "Ana García", group: "1" },
  { id: "2", name: "Carlos López", group: "1" },
  { id: "3", name: "María Rodríguez", group: "1" },
  { id: "4", name: "Juan Pérez", group: "2" },
  { id: "5", name: "Laura Martínez", group: "2" },
  { id: "6", name: "Pedro Sánchez", group: "3" },
  { id: "7", name: "Sofía Fernández", group: "3" },
]

function TeacherDashboard({ onLogout }) {
  const [selectedGroup, setSelectedGroup] = useState("")
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])

  const filteredStudents = selectedGroup ? students.filter((student) => student.group === selectedGroup) : []

  return (
    <DashboardLayout userRole="teacher" onLogout={onLogout}>
      <Container fluid className="py-4">
        <h2 className="mb-4">Panel de Docente</h2>

        <Tabs defaultActiveKey="attendance" className="mb-4">
          <Tab eventKey="attendance" title="Registrar Asistencia">
            <Card>
              <Card.Header>
                <Card.Title>Registrar Asistencia</Card.Title>
                <Card.Subtitle className="text-muted">
                  Selecciona un grupo y marca la asistencia de los alumnos
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Row className="mb-4">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label>Grupo</Form.Label>
                      <Form.Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                        <option value="">Selecciona un grupo</option>
                        {groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {selectedGroup && <AttendanceTable students={filteredStudents} date={attendanceDate} />}

                {selectedGroup && (
                  <div className="mt-4">
                    <Button variant="primary">Guardar Asistencia</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="history" title="Historial">
            <Card>
              <Card.Header>
                <Card.Title>Historial de Asistencias</Card.Title>
                <Card.Subtitle className="text-muted">
                  Consulta el historial de asistencias por grupo y fecha
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <p>Aquí se mostrará el historial de asistencias registradas.</p>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </DashboardLayout>
  )
}

export default TeacherDashboard

