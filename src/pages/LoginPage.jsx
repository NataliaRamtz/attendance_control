"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { ThemeToggle } from "../components/ThemeToggle"
import { useAuth } from "../contexts/AuthContext"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
    } catch (err) {
      // El error ya se maneja en el contexto de autenticación
      console.error("Error de login:", err)
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={5} xl={4}>
          <div className="text-end mb-3">
            <ThemeToggle />
          </div>
          <Card>
            <Card.Header className="text-center py-3">
              <h4 className="mb-0">Iniciar Sesión</h4>
              <p className="text-muted small mb-0">Ingresa tus credenciales para acceder al sistema</p>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" className="d-flex align-items-center mb-3">
                  <AlertCircle size={16} className="me-2" />
                  <div>{error}</div>
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label>Contraseña</Form.Label>
                    <Link to="/forgot-password" className="text-decoration-none small">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3">
              <p className="text-muted small mb-0">
                Para probar, usa:
                <br />
                Admin: admin@example.com / password
                <br />
                Docente: teacher@example.com / password
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage

