import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Home, AlertTriangle } from "lucide-react"
import { ThemeToggle } from "../components/ThemeToggle"

function NotFound() {
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
        <Row className="justify-content-center text-center w-100">
          <Col md={8} lg={6}>
            <div className="mb-4">
              <div className="d-inline-block p-3 rounded-circle bg-warning bg-opacity-10 mb-4">
                <AlertTriangle size={60} className="text-warning" />
              </div>
              <h1 className="display-1 fw-bold mb-0">404</h1>
              <h2 className="mb-4">Página No Encontrada</h2>
              <p className="text-muted mb-5">
                Lo sentimos, la página que estás buscando no existe o ha sido movida. Por favor, verifica la URL o
                regresa a la página principal.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Button
                  as={Link}
                  to="/"
                  variant="primary"
                  className="d-inline-flex align-items-center justify-content-center"
                >
                  <Home size={16} className="me-2" />
                  Ir a Inicio
                </Button>
                <Button as={Link} to="/login" variant="outline-primary">
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="py-3 border-top mt-auto">
        <Container>
          <p className="text-center text-muted mb-0">
            &copy; {new Date().getFullYear()} Control de asistencias. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default NotFound