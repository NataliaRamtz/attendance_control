import { Card, Row, Col, Form, Button } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { BarChart, FileText, Download } from "lucide-react"

function TeacherReports({ onLogout }) {
  return (
    <DashboardLayout userRole="teacher" onLogout={onLogout}>
      <h2 className="mb-4">Reportes</h2>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Generar Reportes</Card.Title>
              <Card.Subtitle className="text-muted">
                Selecciona los parámetros para generar reportes de asistencia
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo de Reporte</Form.Label>
                      <Form.Select>
                        <option>Asistencia por Grupo</option>
                        <option>Asistencia por Alumno</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Grupo</Form.Label>
                      <Form.Select>
                        <option>Todos los grupos</option>
                        <option>Grupo A</option>
                        <option>Grupo B</option>
                        <option>Grupo C</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha Inicio</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha Fin</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>

                {/*<div className="d-flex gap-2">
                  <Button variant="primary">
                    <BarChart size={16} className="me-2" />
                    Generar Reporte
                  </Button>
                  <Button variant="outline-secondary">
                    <Download size={16} className="me-2" />
                    Exportar a Excel
                  </Button>
                  <Button variant="outline-secondary">
                    <FileText size={16} className="me-2" />
                    Exportar a PDF
                  </Button>
                </div>*/}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/*<Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>Reportes Recientes</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-2">
                <div className="p-2 border rounded">
                  <div className="fw-medium">Asistencia Grupo A</div>
                  <div className="text-muted small">Generado: 15/03/2025</div>
                  <Button variant="link" className="p-0 mt-1">
                    Descargar PDF
                  </Button>
                </div>
                <div className="p-2 border rounded">
                  <div className="fw-medium">Resumen Mensual - Febrero</div>
                  <div className="text-muted small">Generado: 01/03/2025</div>
                  <Button variant="link" className="p-0 mt-1">
                    Descargar PDF
                  </Button>
                </div>
                <div className="p-2 border rounded">
                  <div className="fw-medium">Asistencia por Alumno</div>
                  <div className="text-muted small">Generado: 28/02/2025</div>
                  <Button variant="link" className="p-0 mt-1">
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>*/}
      </Row>
    </DashboardLayout>
  )
}

export default TeacherReports