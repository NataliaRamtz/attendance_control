"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap"
import { Users, BookOpen, LayoutDashboard, LogOut, Menu, User, Settings, BarChart, GraduationCap } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Breadcrumbs } from "./Breadcrumb"

export function DashboardLayout({ children, userRole, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSidebar, setShowSidebar] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Docentes",
      href: "/admin/teachers",
      icon: Users,
    },
    {
      title: "Alumnos",
      href: "/admin/students",
      icon: BookOpen,
    },
    {
      title: "Grupos",
      href: "/admin/groups",
      icon: GraduationCap,
    },
    /*{
      title: "Reportes",
      href: "/admin/reports",
      icon: BarChart,
    },*/
    /*{
      title: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },*/
  ]

  const teacherNavItems = [
    {
      title: "Dashboard",
      href: "/teacher/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mis Grupos",
      href: "/teacher/groups",
      icon: Users,
    },
    {
      title: "Reportes",
      href: "/teacher/reports",
      icon: BarChart,
    },
    {
      title: "Perfil",
      href: "/teacher/profile",
      icon: User,
    },
  ]

  const navItems = userRole === "admin" ? adminNavItems : teacherNavItems
  const userName = userRole === "admin" ? "Admin" : "Profesor"

  useEffect(() => {
    setShowSidebar(false)
  }, [location.pathname])

  const renderSidebarContent = () => (
    <>
      <div className="d-flex align-items-center p-3 border-bottom">
        {/*<Link to="/" className="text-decoration-none">*/}
          <h5 className="mb-0 fw-bold text-primary">Control de Asistencias</h5>
        {/*</Link>*/}
      </div>
      <div className="p-3">
        <small className="text-uppercase text-muted fw-bold d-block mb-2">Menú</small>
        <Nav className="flex-column">
          {navItems.map((item) => (
            <Nav.Link
              key={item.title}
              as={Link}
              to={item.href}
              className="d-flex align-items-center"
              onClick={() => setShowSidebar(false)}
            >
              <item.icon size={18} className="me-2" />
              {item.title}
            </Nav.Link>
          ))}
        </Nav>
      </div>
      <div className="mt-auto p-3 border-top">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar me-2">{userName.charAt(0)}</div>
          <div>
            <div className="fw-medium">{userName}</div>
            <small className="text-muted text-capitalize">{userRole}</small>
          </div>
          <Button variant="link" className="ms-auto p-0 text-muted" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
        <ThemeToggle />
      </div>
    </>
  )

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar for desktop */}
      <div className="d-none d-md-flex flex-column sidebar" style={{ width: "250px" }}>
        {renderSidebarContent()}
      </div>

      {/* Mobile sidebar */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="w-75">
        <Offcanvas.Body className="d-flex flex-column p-0">{renderSidebarContent()}</Offcanvas.Body>
      </Offcanvas>

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Mobile header */}
        <Navbar expand={false} className="d-md-none border-bottom">
          <Container fluid>
            <Button variant="light" className="me-2 border" onClick={() => setShowSidebar(true)}>
              <Menu size={18} />
            </Button>
            <Navbar.Brand /*as={Link} to="/"*/ className="mx-auto">
              Control de Asistencias
            </Navbar.Brand>
            <div className="d-flex align-items-center">
              <ThemeToggle />
              <div className="avatar ms-2">{userName.charAt(0)}</div>
            </div>
          </Container>
        </Navbar>

        {/* Page content */}
        <div className="flex-grow-1">
          <Container fluid className="px-3 px-md-4">
            <Breadcrumbs />
            {children}
          </Container>
        </div>
      </div>
    </div>
  )
}

