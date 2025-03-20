import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { useApi } from '@/context/ApiContext';

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const { post, get } = useApi(); // Usar el contexto de la API
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    try {
      // Hacer la solicitud al backend para iniciar sesión
      const loginResponse = await post('/api/auth/login', formData);

      if (loginResponse.error) {
        throw new Error(loginResponse.message || 'Error al iniciar sesión');
      }

      // Guardar el token en localStorage
      localStorage.setItem('token', loginResponse.token);

      // Obtener la información del profesor autenticado (usar GET en lugar de POST)
      const userResponse = await get('/api/auth/me');

      if (userResponse.error) {
        throw new Error('Error al obtener la información del usuario');
      }

      // Guardar el usuario en el estado global (Zustand)
      setUser({
        id: userResponse._id,
        email: userResponse.email,
        role: 'teacher', // Asignar el rol de profesor
      });

      // Redirigir según el rol
      navigate('/'); // Cambia esto según la lógica de tu aplicación
    } catch (err) {
      // Verificar si err es una instancia de Error
      if (err instanceof Error) {
        setError(err.message || 'Error al iniciar sesión');
      } else {
        setError('Ocurrió un error inesperado');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};