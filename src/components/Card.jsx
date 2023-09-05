import React, { useState } from 'react';
import styles from './Card.module.css';
import Button from './Button';

const Modal = ({ user, handleUserDelete }) => {
  const [users, setUsers] = useState([user]);

  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    const updateUser = users.filter((user) => user.id !== id);
    deleteUser(id);
    handleUserDelete(id);

    setUsers(updateUser);

    setMessageSucess('Usuário deletado');
    setTimeout(() => {
      setMessageSucess('');
    }, 3000);
  };

  const updateUser = async (id) => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdite = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateUser(user.id, editedUser);

    setUsers((prevUsers) => {
      return prevUsers.map((prevUser) =>
        prevUser.id === user.id ? editedUser : prevUser,
      );
    });

    setEditing(false);
    setMessageSucess('Usuário atualizado');
    setTimeout(() => {
      setMessageSucess('');
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const filteredUsers = users.filter((user) => !user.deleted);

  return (
    <div className={styles.container}>
      {filteredUsers.map((user) => (
        <div key={user.id} className={styles.editeUser}>
          {editing ? (
            <input
              type="text"
              name="first_name"
              value={editedUser.first_name}
              onChange={handleInputChange}
            />
          ) : (
            user.first_name
          )}{' '}
          {editing ? (
            <input
              type="text"
              name="last_name"
              value={editedUser.last_name}
              onChange={handleInputChange}
            />
          ) : (
            user.last_name
          )}
          <h4>{user.email}</h4>
          <img src={user.avatar} alt="" />
          <div className={styles.actions}>
            {editing ? (
              <Button onClick={handleSave} value={styles.editeButton}>
                Salvar
              </Button>
            ) : (
              <Button onClick={handleEdite} value={styles.editeButton}>
                Editar
              </Button>
            )}
            <Button
              onClick={() => handleDelete(user.id)}
              value={styles.deleteButton}
            >
              Deletar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Modal;
