import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Search, UserCog } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  email: string;
  status: string;
  groups?: string[];
}

const mockTeachers: Teacher[] = [
  { 
    id: 1, 
    name: 'María Rodríguez', 
    email: 'maria@example.com', 
    status: 'Activo',
    groups: ['A1', 'B2']
  },
  { 
    id: 2, 
    name: 'Juan Pérez', 
    email: 'juan@example.com', 
    status: 'Inactivo',
    groups: ['C1']
  },
];

interface TeacherFormData {
  name: string;
  email: string;
  status: string;
}

export const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    email: '',
    status: 'Activo',
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the teacher
    console.log('Adding teacher:', formData);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', status: 'Activo' });
  };

  const handleEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the teacher
    console.log('Updating teacher:', formData);
    setIsEditModalOpen(false);
  };

  const openEditModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      status: teacher.status,
    });
    setIsEditModalOpen(true);
  };

  const TeacherForm = ({ onSubmit, buttonText }: { onSubmit: (e: React.FormEvent) => void, buttonText: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
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
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        {buttonText}
      </Button>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Administrador</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserCog className="h-5 w-5 mr-2" />
          Nuevo Profesor
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar profesores..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        teacher.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {teacher.groups?.map((group) => (
                        <span
                          key={group}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(teacher)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Profesor"
      >
        <TeacherForm onSubmit={handleAddTeacher} buttonText="Agregar Profesor" />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Profesor"
      >
        <TeacherForm onSubmit={handleEditTeacher} buttonText="Guardar Cambios" />
      </Modal>
    </div>
  );
};