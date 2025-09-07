import React, { useState } from 'react';
import api from '../utils/api';
import ViewModal from './ViewModal';
import EditModal from './EditModal';

const ModuleItem = ({ mod, onUpdate }) => {
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await api.delete(`/module/${mod._id}`);
        onUpdate(prev => prev.filter(m => m._id !== mod._id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className='module-item' style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
      <h3>{mod.name}</h3>
      <p>Descrição: {mod.description}</p>
      <p>Publisher ID: {mod.publisherId}</p>
      <p>ID: {mod._id}</p>
      <p>Ferramenta: {mod.tool}</p>
      <button onClick={() => setShowView(true)}>Visualizar</button>
      <button onClick={() => setShowEdit(true)} style={{ marginLeft: '10px' }}>Editar</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: '#e0234e', color: 'white' }}>Excluir</button>
      <ViewModal show={showView} onHide={() => setShowView(false)} mod={mod} />
      <EditModal show={showEdit} onHide={() => setShowEdit(false)} mod={mod} onUpdate={(updated) => onUpdate(prev => prev.map(m => m._id === updated._id ? updated : m))} />
    </div>
  );
};

export default ModuleItem;