import { Card, Row, Col, Form, Button } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { Save, User } from "lucide-react"

function TeacherProfile({ onLogout }) {
  return (
    <DashboardLayout userRole="teacher" onLogout={onLogout}>
      <h2 className="mb-4">Mi Perfil</h2>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Información Personal</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" defaultValue="Juan" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" defaultValue="Pérez" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control type="email" defaultValue="teacher@example.com" />
                    </Form.Group>
                  </Col>
                  {/*<Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control type="tel" defaultValue="555-123-4567" />
                    </Form.Group>
                  </Col>*/}
                </Row>

                {/*<Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Departamento</Form.Label>
                      <Form.Control type="text" defaultValue="Matemáticas" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de Ingreso</Form.Label>
                      <Form.Control type="date" defaultValue="2020-01-15" readOnly />
                    </Form.Group>
                  </Col>
                </Row>*/}

                <Button variant="primary">
                  <Save size={16} className="me-2" />
                  Guardar Cambios
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Cambiar Contraseña</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña Actual</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nueva Contraseña</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary">Actualizar Contraseña</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/*<Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>Foto de Perfil</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="mb-3">
                <div className="d-inline-block position-relative">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "150px", height: "150px", overflow: "hidden" }}
                  >
                    <User size={80} className="text-secondary" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Button variant="outline-primary" size="sm">
                  Cambiar Foto
                </Button>
              </div>
              <div className="text-muted small">Formatos permitidos: JPG, PNG. Tamaño máximo: 2MB</div>
            </Card.Body>
          </Card>
        </Col>*/}
      </Row>
    </DashboardLayout>
  )
}

export default TeacherProfile