import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Card from '../components/Card';

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch('https://reqres.in/api/users?page=2');
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setUsers(data.data);
      // console.log(users);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  // console.log(users);
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div className={styles.home}>
        {users && users.map((user) => <Card user={user} key={user.id} />)}
      </div>
    </div>
  );
};

export default Home;
