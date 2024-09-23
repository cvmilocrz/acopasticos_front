import { useState, useEffect } from 'react';
import Service from '../config/config'; // Importar la instancia de Axios

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await Service.get('/users');
      setUsers(response.data); // Establecer directamente los datos
      setTotalUsers(response.data.length);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const response = await Service.post('/users', userData);
      // Vuelve a obtener la lista de usuarios después de crear uno nuevo
      await fetchUsers(); // Llamar a la función aquí
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };

  const updateUser = async (userData, id) => {
    try {
      const response = await Service.put(`/users/${id}`, userData);
      await fetchUsers(); // Vuelve a obtener la lista de usuarios después de actualizar
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await Service.delete(`/users/${id}`);
      await fetchUsers(); // Vuelve a obtener la lista de usuarios después de actualizar
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };

  return { users, loading, error, totalUsers, createUser, updateUser, deleteUser };
};

export default useFetchUsers;
