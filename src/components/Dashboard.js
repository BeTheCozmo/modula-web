import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ModuleItem from './ModuleItem';
import UploadModal from './UploadModal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get('/module');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
    fetchModules();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container dashboard">
      <h2>Módulos</h2>
      <Button onClick={() => setShowUpload(true)} className="btn-primary">Upload</Button>
      <Button onClick={() => navigate('/profile')} className="btn-secondary">Perfil</Button>
      <Button onClick={handleLogout} className="btn-primary">Logout</Button>
      <div className="modules-container">
        {modules.map(mod => (
          <ModuleItem key={mod._id} mod={mod} onUpdate={setModules} />
        ))}
      </div>
      <UploadModal show={showUpload} onHide={() => setShowUpload(false)} onUpload={(newModule) => setModules([...modules, newModule])} />
    </div>
  );
};

export default Dashboard;