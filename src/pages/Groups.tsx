import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, UsersRound, Pencil, Trash2 } from 'lucide-react';
import { useApi } from '@/context/ApiContext';
import { useAuthStore } from '@/store/authStore';
import { Modal } from '@/components/ui/Modal';

export const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const { get, post, put, del } = useApi();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await get('/api/groups');
        setGroups(data);
      } catch (err) {
        setError('Error al cargar los grupos');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (groupData: any) => {
    try {
      const newGroup = await post('/api/groups', {
        ...groupData,
        teacher: user?.id,
      });
      setGroups([...groups, newGroup]);
      setShowCreateModal(false);
    } catch (err) {
      setError('Error al crear el grupo');
    }
  };

  const handleUpdateGroup = async (id: string, groupData: any) => {
    try {
      const updatedGroup = await put(`/api/groups/${id}`, groupData);
      setGroups(groups.map((g) => (g._id === id ? updatedGroup : g)));
      setSelectedGroup(null);
    } catch (err) {
      setError('Error al actualizar el grupo');
    }
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      await del(`/api/groups/${id}`);
      setGroups(groups.filter((g) => g._id !== id));
    } catch (err) {
      setError('Error al eliminar el grupo');
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div>Cargando grupos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Grupos</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <UsersRound className="h-5 w-5 mr-2" />
          Nuevo Grupo
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar grupos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredGroups.map((group) => (
            <div key={group._id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{group.name}</h3>
                  <p className="text-gray-600">{group.teacher?.name}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGroup(group._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <UsersRound className="h-5 w-5 mr-2" />
                <span>{group.students?.length || 0} estudiantes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para crear/editar grupos */}
      <Modal
        isOpen={showCreateModal || !!selectedGroup}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedGroup(null);
        }}
        title={selectedGroup ? 'Editar Grupo' : 'Nuevo Grupo'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('name') as string;

            if (selectedGroup) {
              handleUpdateGroup(selectedGroup._id, { name });
            } else {
              handleCreateGroup({ name });
            }
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Grupo
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={selectedGroup?.name}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => {
              setShowCreateModal(false);
              setSelectedGroup(null);
            }}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedGroup ? 'Guardar Cambios' : 'Crear Grupo'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};