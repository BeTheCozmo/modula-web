import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../utils/api';

const UploadModal = ({ show, onHide, onUpload }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tool, setTool] = useState('angular');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const buildNodeTree = async (files) => {
    const root = { type: 'directory', name: '', children: [] };
    const promises = [];

    Array.from(files).forEach(file => {
      const parts = file.webkitRelativePath.split('/');
      let current = root;
      parts.forEach((part, index) => {
        if (part === '') return;
        if (index === parts.length - 1) {
          // File
          promises.push(
            file.text().then(content => {
              current.children.push({ type: 'file', name: part, content });
            })
          );
        } else {
          // Directory
          let dir = current.children.find(child => child.name === part && child.type === 'directory');
          if (!dir) {
            dir = { type: 'directory', name: part, children: [] };
            current.children.push(dir);
          }
          current = dir;
        }
      });
    });

    await Promise.all(promises);
    return root.children;
  };

  const handleUpload = async () => {
    try {
      const nodes = await buildNodeTree(files);
      const payload = {
        name,
        description,
        path: files[0]?.webkitRelativePath.split('/')[0] || '', // Approximate path
        tool,
        nodes,
      };
      const response = await api.post('/module', payload);
      onUpload(response.data);
      onHide();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Módulo</Modal.Title>
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
          <Form.Group>
            <Form.Label>Selecionar Pasta</Form.Label>
            <Form.Control type="file" webkitdirectory="" directory="" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" style={{ backgroundColor: '#e0234e', border: 'none' }} onClick={handleUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;