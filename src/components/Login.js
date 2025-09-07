import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita recarregamento da página
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Erro ao logar');
    }
  };

  return (
    <div className="auth-panel">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p><a href="/register">Registrar</a></p>
    </div>
  );
};

export default Login;