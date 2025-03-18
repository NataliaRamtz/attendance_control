import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Navbar } from "react-bootstrap"
import { ThemeToggle } from "../components/ThemeToggle"

function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand /*as={Link} to="/"*/ className="fw-bold">
          Control de Asistencias
          </Navbar.Brand>
          <div className="ms-auto">
            <ThemeToggle />
          </div>
        </Container>
      </Navbar>

      <main className="flex-grow-1">
        <section className="py-5">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8} lg={6}>
                <div className="mb-4">
                  <h1 className="display-5 fw-bold mb-3">Control de Asistencias para Docentes</h1>
                  <p className="lead text-muted mb-4">
                    Gestiona la asistencia de los alumnos de manera eficiente y sencilla.
                  </p>
                </div>
                <div>
                  <Link to="/login">
                    <Button variant="primary" size="lg">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

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

export default HomePage

