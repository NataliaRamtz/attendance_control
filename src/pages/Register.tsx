import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated registration - in real app, use Supabase auth
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};