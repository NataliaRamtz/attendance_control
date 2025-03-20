import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Groups } from './pages/Groups';
import { Attendance } from './pages/Attendance';
import { AdminPanel } from './pages/AdminPanel';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
}

function TeacherRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user?.role === 'teacher' ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {user?.role === 'admin' ? <Navigate to="/admin" /> : <Dashboard />}
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <TeacherRoute>
                <Students />
              </TeacherRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <TeacherRoute>
                <Groups />
              </TeacherRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <TeacherRoute>
                <Attendance />
              </TeacherRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;