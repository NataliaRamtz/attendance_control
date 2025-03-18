import { Card, Button, Tab, Tabs } from "react-bootstrap"
import { DashboardLayout } from "../components/DashboardLayout"
import { TeachersTable } from "../components/TeachersTable"
import { StudentsTable } from "../components/StudentsTable"
import { GroupsTable } from "../components/GroupsTable"

function AdminDashboard({ onLogout }) {
  return (
    <DashboardLayout userRole="admin" onLogout={onLogout}>
      <h2 className="mb-4">Panel de Administrador</h2>

      <Tabs defaultActiveKey="teachers" className="mb-4">
        <Tab eventKey="teachers" title="Docentes">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>Gestión de Docentes</Card.Title>
                <Card.Subtitle className="text-muted">Administra los docentes registrados</Card.Subtitle>
              </div>
              {/*<Button variant="primary">Agregar Docente</Button>*/}
            </Card.Header>
            <Card.Body>
              <TeachersTable />
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="students" title="Alumnos">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>Gestión de Alumnos</Card.Title>
                <Card.Subtitle className="text-muted">Administra los alumnos registrados</Card.Subtitle>
              </div>
              {/*<Button variant="primary">Agregar Alumno</Button>*/}
            </Card.Header>
            <Card.Body>
              <StudentsTable />
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="groups" title="Grupos">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>Gestión de Grupos</Card.Title>
                <Card.Subtitle className="text-muted">Administra los grupos</Card.Subtitle>
              </div>
              {/*<Button variant="primary">Crear Grupo</Button>*/}
            </Card.Header>
            <Card.Body>
              <GroupsTable />
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

export default AdminDashboard



