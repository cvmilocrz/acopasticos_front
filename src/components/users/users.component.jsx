import './users.component.css';
import Filter from '../../assets/icons/filter.svg';
import useFetchUsers from '../../hooks/useFetchUsers';
import { useEffect, useState } from 'react';
import Modal from '../../tools/modal';
import UsersIcon from '../../assets/icons/users.svg';

import EditIcon from '../../assets/icons/edit.svg';
import TrashIcon from '../../assets/icons/trash.svg';

import Loader from '../../tools/loader';

function Users() {
  const { users, loading, error, totalUsers, createUser: createUserService, updateUser: updateUserService, deleteUser: deleteUserService } = useFetchUsers();
  const [createUser, setCreateUser] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    user: '',
    email: '',
    password: '',
    user_type: 1,
  });
  const [updateUserData, setUpdateUserData] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    user: '',
    email: '',
    password: '',
    user_type: 1,
  });

  const [deleteUserData, setDeleteUserData] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    user: '',
    email: '',
    password: '',
    user_type: 1,
  });




  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setUpdateUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);

  const openCreateUserModal = () => setCreateUser(true);
  const closeCreateUserModal = () => {
    setUserData({
      first_name: '',
      last_name: '',
      user: '',
      email: '',
      password: '',
      confirmPassword: '',
      user_type: 1,
    });
    setCreateUser(false);
  };


  const openDeleteUserModal = () => setDeleteModal(true);
  const closeDeleteUserModal = () => setDeleteModal(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      await createUserService(userData);
      closeCreateUserModal();
      // Aquí puedes volver a cargar los usuarios si es necesario
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserService(updateUserData, updateUserData.id);
      closeCreateUserModal();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserService(deleteUserData.id);
      closeCreateUserModal();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error al cargar usuarios: {error.message}</div>;

  return (
    <>
      <Modal isOpen={editModal}>
        <div className='editUserModal'>
          <div className='editUserModalHeader'>
            Editar Usuario
            <div className='closeModalBtn' onClick={closeEditModal}>
              <span className='closeModalIcon'>&times;</span>
            </div>
          </div>
          <div className='editUserModalHeaderContent'>
            <div className='createUserForm'>
              <div className='createUserFormGroup'>
                <div className='createUserFormInput'>
                  <label>Nombres</label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleInputChange('first_name')}
                    value={updateUserData.first_name}
                  />
                </div>
                <div className='createUserFormInput'>
                  <label>Apellidos</label>
                  <input type="text" name="last_name" onChange={handleInputChange('last_name')} value={updateUserData.last_name} />
                </div>
              </div>

              <div className="createUserFormGroup">
                <div className='createUserFormInput'>
                  <label>Usuario</label>
                  <input type="text" name="user" onChange={handleInputChange('user')} value={updateUserData.user} />
                </div>
                <div className='createUserFormInput'>
                  <label>Correo</label>
                  <input type="email" name="email" onChange={handleInputChange('email')} value={updateUserData.email} />
                </div>
              </div>
              <div className="createUserFormGroup">
                <div className='createUserFormInput'>
                  <label>Contraseña</label>
                  <input type="text" name="password" onChange={handleInputChange('password')} />
                </div>
                <div className='createUserFormInput'>
                  <label>Confirmar Contraseña</label>
                  <input type="text" name="confirmPassword" onChange={handleInputChange('confirmPassword')} value={updateUserData.confirmPassword} />
                </div>
              </div>
              <div className="createUserFormGroupBtn">
                <div className='cancelCreateUserBtn' onClick={closeEditModal}>Cancelar</div>
                <div className='createUserFormBtn' onClick={() => {
                  handleUpdateUser();
                  closeEditModal();
                }}>Actualizar</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={createUser}>
        <div className='createUserModal'>
          <div className='editUserModalHeader'>
            Crear Usuario
            <div className='closeModalBtn' onClick={closeCreateUserModal}>
              <span className='closeModalIcon'>&times;</span>
            </div>
          </div>
          <div className='editUserModalHeaderContent'>
            <div className='createUserForm'>
              <div className='createUserFormGroup'>
                <div className='createUserFormInput'>
                  <label>Nombres</label>
                  <input type="text" name="first_name" onChange={handleChange} value={userData.first_name} />
                </div>
                <div className='createUserFormInput'>
                  <label>Apellidos</label>
                  <input type="text" name="last_name" onChange={handleChange} value={userData.last_name} />
                </div>
              </div>

              <div className="createUserFormGroup">
                <div className='createUserFormInput'>
                  <label>Usuario</label>
                  <input type="text" name="user" onChange={handleChange} value={userData.user} />
                </div>
                <div className='createUserFormInput'>
                  <label>Correo</label>
                  <input type="email" name="email" onChange={handleChange} value={userData.email} />
                </div>
              </div>
              <div className="createUserFormGroup">
                <div className='createUserFormInput'>
                  <label>Contraseña</label>
                  <input type="text" name="password" onChange={handleChange} value={userData.password} />
                </div>
                <div className='createUserFormInput'>
                  <label>Confirmar Contraseña</label>
                  <input type="text" name="confirmPassword" onChange={handleChange} value={userData.confirmPassword} />
                </div>
              </div>
              <div className="createUserFormGroupBtn">
                <div className='cancelCreateUserBtn' onClick={closeCreateUserModal}>Cancelar</div>
                <div className='createUserFormBtn' onClick={handleCreateUser}>Crear</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={deleteModal}>
        <div className='deleteUserModal'>
          <div className='editUserModalHeader'>
            Eliminar Usuario
            <div className='closeModalBtn' onClick={closeCreateUserModal}>
              <span className='closeModalIcon'>&times;</span>
            </div>
          </div>
          <div className='editUserModalHeaderContent'>
            ¿Deseas eliminar a {deleteUserData.first_name} {deleteUserData.last_name}?
            <div className="createUserFormGroupBtn">
              <div className='cancelCreateUserBtn' onClick={closeDeleteUserModal}>Cancelar</div>
              <div className='createUserFormBtn' onClick={() => {
                handleDeleteUser();
                closeDeleteUserModal();
              }}>Eliminar</div>
            </div>

          </div>
        </div>

      </Modal>

      <div className="usersContainer">
        <div className="usersWindowHeader">Panel de control de Usuarios</div>
        <div className="usersWindowHeaderContent">
          <div className="usersWindowHeaderContentleft">
            <img src={UsersIcon} alt="" className='UsersIconModal' />
            <p className='usersWindowDescription'>Aquí encontrarás todos los usuarios registrados en el sistema, tanto internos como externos.</p>
          </div>
          <div className="usersWindowHeaderContentRight">
            <div>Usuarios Activos: {users.length}</div>
          </div>
        </div>
        <div className="usersWindowContentMenu">
          <div className='usersFilterContainer'>
            <div className='usersFilter'>
              <img src={Filter} alt="Filter" className='dashboardIcons' />
              Filtro
            </div>
            <div>
              <input type="text" placeholder="Buscar por Nombre" className='usersFilterInput' />
            </div>
          </div>
          <div className='createUserBtn' onClick={openCreateUserModal}>Crear usuario</div>
        </div>
        <div className="usersWindowContent">
          <table className='usersTable'>
            <thead>
              <tr>
                <th>
                  <div className="menuItemContainer">
                    Nombre
                  </div>
                </th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha de Creación</th>
                <th>
                  <div className='userActionsTh'>Acciones</div></th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user.user_type === 1)
                .map(user => (
                  <tr key={user.id}>
                    <td><div className='menuItemContainer'>
                      {user.first_name} {user.last_name}
                    </div></td>
                    <td>{user.user}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className='userActions'>
                      <div className='editUserBtn' onClick={() => {
                        setUpdateUserData(user); // Asigna todos los datos del usuario al abrir el modal
                        openEditModal();
                      }}>
                        <img src={EditIcon} alt="Editar Usuario" className='userActionsIcon' />
                      </div>
                      <div className='deleteUserBtn' onClick={() => {
                        openDeleteUserModal();
                        setDeleteUserData(user);
                      }}>
                        <img src={TrashIcon} alt="Eliminar Usuario" className='userActionsIcon' />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
