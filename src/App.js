"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import LoginPage from "./pages/LoginPage"
import ForgotPassword from "./pages/ForgotPassword"
import TeacherDashboard from "./pages/TeacherDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import HomePage from "./pages/HomePage"
import TeacherGroups from "./pages/TeacherGroups"
import TeacherReports from "./pages/TeacherReports"
import TeacherProfile from "./pages/TeacherProfile"
import AdminTeachers from "./pages/AdminTeachers"
import AdminStudents from "./pages/AdminStudents"
import AdminGroups from "./pages/AdminGroups"
import NotFound from "./pages/NotFound"

function App() {
  const { isAuthenticated, hasRole, loading, logout } = useAuth()

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  // Componente para rutas protegidas
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    if (allowedRole && !hasRole(allowedRole)) {
      return <Navigate to="/" replace />
    }

    return children
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Rutas de Docente */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/groups"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherGroups onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/reports"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherReports onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherProfile onLogout={logout} />
          </ProtectedRoute>
        }
      />

      {/* Rutas de Administrador */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminTeachers onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminStudents onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/groups"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminGroups onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRole="admin">
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRole="admin">
          </ProtectedRoute>
        }
      />

      {/* Ruta para manejar páginas no encontradas (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

