import React, { useState } from 'react';
import styles from './NewUser.module.css';
import Button from '../components/Button';

const NewUser = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [messageSucess, setMessageSucess] = useState('');
  const [messageError, setMessageError] = useState('');

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

      if (res.status !== 200) {
        throw new Error('Erro na criação do usuário');
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewUser = async (e) => {
    e.preventDefault();

    if (user.password === '' || user.confirmPassword === '') {
      setMessageError('Preencha o campo senha');
    }

    if (user.password !== user.confirmPassword) {
      setMessageError('As senhas precisam ser iguais');

      setTimeout(() => {
        setMessageError('');
      }, 2000);
      return;
    }

    if (!validateEmail(user.email)) {
      setMessageError('Insira um email válido');
      setTimeout(() => {
        setMessageError('');
      }, 2000);
      return;
    }

    try {
      const data = await newUser();
      if (data.error) {
        setMessageError('Erro na criação do usuário');
      } else {
        setMessageSucess('Parabéns usuário criado com sucesso.');
      }
    } catch (error) {
      setMessageError('Erro na criação do usuário');
    }

    setTimeout(() => {
      setMessageError('');
      setMessageSucess('');
    }, 2000);
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
        <label>
          Confirme a senha
          <input
            type="password"
            name="confirmPassword"
            placeholder="Senha"
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Criar</Button>
      </form>
      {messageError && <h2>{messageError}</h2>}
      {messageSucess && <h2>{messageSucess}</h2>}
    </div>
  );
};

export default NewUser;
