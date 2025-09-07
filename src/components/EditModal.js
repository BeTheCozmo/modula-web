import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../utils/api';

const EditModal = ({ show, onHide, mod, onUpdate }) => {
  const [name, setName] = useState(mod.name);
  const [description, setDescription] = useState(mod.description);
  const [tool, setTool] = useState(mod.tool);

  const handleEdit = async () => {
    try {
      const response = await api.patch(`/module/${mod._id}`, { name, description, tool });
      onUpdate(response.data);
      onHide();
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Módulo: {mod.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ferramenta</Form.Label>
            <Form.Control as="select" value={tool} onChange={(e) => setTool(e.target.value)}>
              <option>angular</option>
              <option>nestjs</option>
              <option>react</option>
              <option>vue</option>
              <option>bash</option>
              <option>js-scripts</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" style={{ backgroundColor: '#e0234e', border: 'none' }} onClick={handleEdit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;