import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calendar, Check, X } from 'lucide-react';
import { useApi } from '@/context/ApiContext';
import { useAuthStore } from '@/store/authStore';

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { get, post } = useApi();
  const { user } = useAuthStore();

  // Obtener los grupos del profesor
  useEffect(() => {
    const fetchGroups = async () => {
      if (user?.groups) { // Ahora TypeScript reconoce la propiedad `groups`
        try {
          const data = await get(`/api/groups?ids=${user.groups.join(',')}`);
          setGroups(data);
        } catch (err) {
          setError('Error al cargar los grupos');
        }
      }
    };

    fetchGroups();
  }, [user]);

  // Obtener los estudiantes del grupo seleccionado
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGroup) {
        try {
          const data = await get(`/api/students?group=${selectedGroup}`);
          setStudents(data);
        } catch (err) {
          setError('Error al cargar los estudiantes');
        }
      }
    };

    fetchStudents();
  }, [selectedGroup]);

  // Obtener la asistencia del grupo y fecha seleccionados
  useEffect(() => {
    const fetchAttendance = async () => {
      if (selectedGroup && selectedDate) {
        try {
          const data = await get(`/api/assistance?date=${selectedDate}&group=${selectedGroup}`);
          setAttendance(data);
        } catch (err) {
          setError('Error al cargar la asistencia');
        }
      }
    };

    fetchAttendance();
  }, [selectedDate, selectedGroup]);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, status } : item,
      ),
    );
  };

  const handleSaveAttendance = async () => {
    try {
      const attendanceData = {
        date: selectedDate,
        group: selectedGroup,
        students: attendance.map((item) => ({
          studentId: item.studentId,
          status: item.status,
        })),
      };

      await post('/api/assistance', attendanceData);
      alert('Asistencia guardada correctamente');
    } catch (err) {
      setError('Error al guardar la asistencia');
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Asistencia</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grupo
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Seleccionar grupo</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asistencia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const attendanceRecord = attendance.find(
                  (item) => item.studentId === student._id,
                );
                const status = attendanceRecord ? attendanceRecord.status : 'absent';

                return (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          variant={status === 'present' ? 'primary' : 'ghost'}
                          size="sm"
                          className="w-24"
                          onClick={() => handleStatusChange(student._id, 'present')}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Presente
                        </Button>
                        <Button
                          variant={status === 'absent' ? 'primary' : 'ghost'}
                          size="sm"
                          className="w-24"
                          onClick={() => handleStatusChange(student._id, 'absent')}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Ausente
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveAttendance}>
            Guardar Asistencia
          </Button>
        </div>
      </div>
    </div>
  );
};