import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, setUser } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-900">
              EduManager
            </Link>
            {user && (
              <div className="ml-10 flex items-center space-x-4">
                {user.role === 'teacher' && (
                  <>
                    <Link
                      to="/students"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Estudiantes
                    </Link>
                    <Link
                      to="/groups"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Grupos
                    </Link>
                    <Link
                      to="/attendance"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Asistencia
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};