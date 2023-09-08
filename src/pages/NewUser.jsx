import React, { useState } from 'react';
import styles from './NewUser.module.css';
import Button from '../components/Button';
import Message from '../components/Message.jsx';
import messageStyle from '../components/Message.module.css';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [messageSucess, setMessageSuccess] = useState('');
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

  const validateForm = () => {
    if (user.email === '') {
      showMessage('Insira o email', 'error');
      return false;
    }

    if (!validateEmail(user.email)) {
      showMessage('Insira um email válido', 'error');
      return false;
    }
    if (user.password === '' || user.confirmPassword === '') {
      showMessage('Preencha o campo senha', 'error');
      return false;
    }

    if (user.password !== user.confirmPassword) {
      showMessage('As senhas precisam ser iguais', 'error');
      return false;
    }
    return true;
  };

  const handleNewUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = await newUser();
      if (data.error) {
        showMessage('Erro na criação do usuário', 'error');
      } else {
        showMessage('Parabéns usuário criado com sucesso.', 'success');
        setUser({
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.log('Erro na criação do usuário');
    }
  };

  const showMessage = (message, type) => {
    if (type === 'error') {
      setMessageError(message);
    } else if (type === 'success') {
      setMessageSuccess(message);
    }

    setTimeout(() => {
      setMessageError('');
      setMessageSuccess('');
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
            value={user.email}
          />
        </label>
        <label>
          Insira a senha
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            value={user.password}
          />
        </label>
        <label>
          Confirme a senha
          <input
            type="password"
            name="confirmPassword"
            placeholder="Senha"
            onChange={handleChange}
            value={user.confirmPassword}
          />
        </label>
        <Button type="submit">Criar</Button>
      </form>
      {messageError && (
        <Message type={messageStyle.error} message={messageError} />
      )}
      {messageSucess && (
        <Message type={messageStyle.success} message={messageSucess} />
      )}
    </div>
  );
};

export default NewUser;
