import React, { useState } from 'react';
import styles from './Card.module.css';
import Button from './Button';

const Modal = ({ user }) => {
  const [users, setUsers] = useState([user]);

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
    setUsers(updateUser);
    deleteUser(id);
  };
  const handleEdite = () => {};
  console.log(users);
  return (
    <div className={styles.container}>
      <h3>
        {user.first_name} {user.last_name}
      </h3>
      <h4>{user.email}</h4>
      <img src={user.avatar} alt="" />
      <div className={styles.actions}>
        <Button onClick={handleEdite} value={styles.editeButton}>
          Editar
        </Button>
        <Button
          onClick={() => handleDelete(user.id)}
          value={styles.deleteButton}
        >
          Deletar
        </Button>
      </div>
    </div>
  );
};

export default Modal;
