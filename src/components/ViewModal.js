import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewModal = ({ show, onHide, mod }) => {
  const [copied, setCopied] = useState(false);

  const formatNodes = (nodes, indent = 0, prefix = '') => {
    return nodes.map((node, index) => {
      const isLast = index === nodes.length - 1;
      const connector = isLast ? '└──' : '├──';
      const line = `${prefix}${connector} ${node.type === 'directory' ? '📁' : '📄'} ${node.name}`;
      
      if (node.type === 'directory' && node.children && node.children.length > 0) {
        return [
          line,
          formatNodes(node.children, indent + 1, isLast ? '    ' : '│   ')
        ].join('\n');
      }
      return line;
    }).join('\n');
  };

  const handleCopy = () => {
    const command = `modula download ${mod._id}`;
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Volta ao estado normal após 2 segundos
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Módulo: {mod.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {mod._id}</p>
        <p><strong>Descrição:</strong> {mod.description}</p>
        <p><strong>Ferramenta:</strong> {mod.tool}</p>
        <p><strong>Caminho Salvo:</strong> {mod.savedPath}</p>
        <p><strong>Publicador:</strong> {mod.publisherId}</p>
        <pre>
          Estrutura de Arquivos:<br/>
          📁 {mod.name}<br/>
          {formatNodes(mod.nodes)}
        </pre>
        <div className="copy-command-container">
          <pre className="copy-command-pre">
            $ modula download {mod._id}
          </pre>
          <Button
            className="copy-button"
            onClick={handleCopy}
            variant={copied ? "success" : "primary"}
          >
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;