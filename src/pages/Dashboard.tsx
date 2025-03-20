import { Users, UserPlus, UsersRound, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/students"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Estudiantes</h2>
          <p className="text-gray-600">Gestiona tus estudiantes</p>
        </Link>

        <Link
          to="/groups"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <UsersRound className="h-8 w-8 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Grupos</h2>
          <p className="text-gray-600">Organiza tus grupos</p>
        </Link>

        <Link
          to="/attendance"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <ClipboardCheck className="h-8 w-8 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Asistencia</h2>
          <p className="text-gray-600">Toma asistencia</p>
        </Link>

        <Link
          to="/students/new"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <UserPlus className="h-8 w-8 text-orange-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nuevo Estudiante</h2>
          <p className="text-gray-600">Añade un nuevo estudiante</p>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Resumen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Estudiantes</p>
            <p className="text-2xl font-bold text-blue-600">24</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Grupos Activos</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Asistencia Promedio</p>
            <p className="text-2xl font-bold text-purple-600">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};