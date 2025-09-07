import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita recarregamento da página
    try {
      await api.post('/auth/register', { name, nickname, email, password });
      alert('Registro bem-sucedido. Faça login.');
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
      alert('Erro ao registrar');
    }
  };

  return (
    <div className="auth-panel">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <p><a href="/login">Login</a></p>
    </div>
  );
};

export default Register;