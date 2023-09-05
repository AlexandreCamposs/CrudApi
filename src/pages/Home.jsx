import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Card from '../components/Card';

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch('https://reqres.in/api/users?page=2');
      const data = await res.json();
      // setUsers(data.data);
      const filteredUsers = data.data.filter((user) => !user.deleted);
      setUsers(filteredUsers);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleUserDelete = (deletedUserId) => {
    const updatedUsers = users.filter((user) => user.id !== deletedUserId);
    setUsers(updatedUsers);
  };
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div className={styles.home}>
        {users &&
          users.map((user) => (
            <Card
              user={user}
              key={user.id}
              handleUserDelete={handleUserDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
