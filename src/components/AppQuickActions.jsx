import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaFileAlt, FaBoxOpen, FaTruck, FaFileExport } from 'react-icons/fa';

const actions = [
  { icon: <FaFileAlt />, label: 'Create Order', shortcut: 'ctrl + n' },
  { icon: <FaBoxOpen />, label: 'Add Product', shortcut: 'ctrl + p' },
  { icon: <FaTruck />, label: 'Add Supplier', shortcut: 'ctrl + k' },
  { icon: <FaFileExport />, label: 'Export', shortcut: 'ctrl + s' },
];

const AppQuickActions = () => {
  return (
    <ListGroup variant="flush">
      {actions.map((action, idx) => (
        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center border-0">
          <span className="d-flex align-items-center gap-2">
            {action.icon} {action.label}
          </span>
          <span className="text-muted small">{action.shortcut}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AppQuickActions;
