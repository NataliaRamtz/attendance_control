"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import { ThemeToggle } from "../components/ThemeToggle"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación básica
    if (!email || !email.includes("@")) {
      setError("Por favor ingresa un correo electrónico válido")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulación de envío de correo de recuperación
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulación exitosa
      setIsSubmitted(true)
    } catch (err) {
      setError("Ocurrió un error al enviar el correo. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="py-3 border-bottom">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none">
              <h5 className="mb-0 fw-bold">Control de Asistencias</h5>
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Container className="flex-grow-1 d-flex align-items-center py-5">
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6} xl={5}>
            <Card>
              <Card.Header className="bg-transparent text-center py-3">
                <h4 className="mb-0">Recuperar Contraseña</h4>
              </Card.Header>

              <Card.Body className="p-4">
                {!isSubmitted ? (
                  <>
                    <p className="text-muted mb-4">
                      Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                    </p>

                    {error && (
                      <Alert variant="danger" className="mb-4">
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>Enviando...</>
                          ) : (
                            <>
                              <Send size={16} className="me-2" />
                              Enviar Instrucciones
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </>
                ) : (
                  <div className="text-center py-3">
                    <CheckCircle size={48} className="text-success mb-3" />
                    <h5>¡Correo Enviado!</h5>
                    <p className="text-muted mb-4">
                      Hemos enviado instrucciones para restablecer tu contraseña a <strong>{email}</strong>. Por favor
                      revisa tu bandeja de entrada y sigue las instrucciones.
                    </p>
                    <p className="text-muted small mb-0">
                      Si no recibes el correo en unos minutos, revisa tu carpeta de spam o correo no deseado.
                    </p>
                  </div>
                )}
              </Card.Body>

              <Card.Footer className="bg-transparent text-center py-3">
                <Link to="/login" className="text-decoration-none d-inline-flex align-items-center">
                  <ArrowLeft size={16} className="me-2" />
                  Volver a Iniciar Sesión
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="py-3 border-top">
        <Container>
          <p className="text-center text-muted mb-0">
            &copy; {new Date().getFullYear()} Control de Asistencias. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default ForgotPassword