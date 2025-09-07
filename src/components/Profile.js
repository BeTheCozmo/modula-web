import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assume endpoint GET /auth/me for user info
        const response = await api.get('/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Profile error:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className='profile' style={{ padding: '20px' }}>
      <h2>Perfil</h2>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Nickname:</strong> {user.nickname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate('/dashboard')} style={{ marginRight: '10px' }}>Voltar para Dashboard</button>
      <button onClick={handleLogout} style={{ backgroundColor: '#e0234e', color: 'white' }}>Logout</button>
    </div>
  );
};

export default Profile;