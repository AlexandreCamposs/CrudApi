import React, { useState } from 'react';
import styles from './NewUser.module.css';
import Button from '../components/Button';

const NewUser = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const newUser = async () => {
    try {
      const res = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewUser = async (e) => {
    e.preventDefault();

    const data = await newUser();

    setMessage(data);

    setInterval(() => {
      setMessage('');
    }, 3000);
  };
  return (
    <div className={styles.container}>
      <h1>Novo Usuário</h1>
      <form onSubmit={handleNewUser}>
        <label>
          Insira o e-mail
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
          />
        </label>
        <label>
          Insira a senha
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Criar</Button>
      </form>
      {message && <h2>Parabéns usuário criado com sucesso.</h2>}
    </div>
  );
};

export default NewUser;
