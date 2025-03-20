import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, UserPlus, Pencil, Trash2 } from 'lucide-react';
import { useApi } from '@/context/ApiContext';
import { Modal } from '@/components/ui/Modal'; // Usar tu componente Modal
import { useAuthStore } from '@/store/authStore';

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { get, post, put, del } = useApi();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await get('/api/students');
        setStudents(data);
      } catch (err) {
        setError('Error al cargar los estudiantes');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = async (studentData: any) => {
    try {
      const newStudent = await post('/api/students', studentData);
      setStudents([...students, newStudent]);
      setShowCreateModal(false);
    } catch (err) {
      setError('Error al crear el estudiante');
    }
  };

  const handleUpdateStudent = async (id: string, studentData: any) => {
    try {
      const updatedStudent = await put(`/api/students/${id}`, studentData);
      setStudents(students.map((s) => (s._id === id ? updatedStudent : s)));
      setSelectedStudent(null);
    } catch (err) {
      setError('Error al actualizar el estudiante');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await del(`/api/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      setError('Error al eliminar el estudiante');
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div>Cargando estudiantes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Estudiantes</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <UserPlus className="h-5 w-5 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar estudiantes..."
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
                  Matrícula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.matricula}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.group?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear/editar estudiantes */}
      <Modal
        isOpen={showCreateModal || !!selectedStudent}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedStudent(null);
        }}
        title={selectedStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;
            const matricula = formData.get('matricula') as string;
            const group = formData.get('group') as string;

            if (selectedStudent) {
              handleUpdateStudent(selectedStudent._id, { name, matricula, group });
            } else {
              handleCreateStudent({ name, matricula, group });
            }
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={selectedStudent?.name}
              required
            />
          </div>
          <div>
            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
              Matrícula
            </label>
            <Input
              id="matricula"
              name="matricula"
              type="text"
              defaultValue={selectedStudent?.matricula}
              required
            />
          </div>
          <div>
            <label htmlFor="group" className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <Input
              id="group"
              name="group"
              type="text"
              defaultValue={selectedStudent?.group?.name}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setSelectedStudent(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {selectedStudent ? 'Guardar Cambios' : 'Crear Estudiante'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};