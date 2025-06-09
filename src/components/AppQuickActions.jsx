// import React from 'react';
// import { ListGroup } from 'react-bootstrap';
// import { FaFileAlt, FaBoxOpen, FaTruck, FaFileExport } from 'react-icons/fa';

// const actions = [
//   { icon: <FaFileAlt />, label: 'Create Order', shortcut: 'ctrl + n' },
//   { icon: <FaBoxOpen />, label: 'Add Product', shortcut: 'ctrl + p' },
//   { icon: <FaTruck />, label: 'Add Supplier', shortcut: 'ctrl + k' },
//   { icon: <FaFileExport />, label: 'Export', shortcut: 'ctrl + s' },
// ];

// const AppQuickActions = () => {
//   return (
//     <ListGroup variant="flush">
//       {actions.map((action, idx) => (
//         <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center border-0">
//           <span className="d-flex align-items-center gap-2">
//             {action.icon} {action.label}
//           </span>
//           <span className="text-muted small">{action.shortcut}</span>
//         </ListGroup.Item>
//       ))}
//     </ListGroup>
//   );
// };

// export default AppQuickActions;

// AppQuickActions.jsx
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaFileAlt, FaBoxOpen, FaTruck, FaFileExport } from 'react-icons/fa';
import AppAddSupplierForm from './AppAddSupplierForm';
import AppAddProductForm from './AppAddProductForm'; // <-- Import the Product Form

const AppQuickActions = () => {
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false); // <-- New state

  const handleShowSupplier = () => setShowSupplierModal(true);
  const handleCloseSupplier = () => setShowSupplierModal(false);

  const handleShowProduct = () => setShowProductModal(true); // <-- Show handler
  const handleCloseProduct = () => setShowProductModal(false); // <-- Close handler

  const actions = [
    { icon: <FaFileAlt />, label: 'Create Order', shortcut: 'ctrl + n' },
    {
      icon: <FaBoxOpen />,
      label: 'Add Product',
      shortcut: 'ctrl + p',
      onClick: handleShowProduct, // <-- Add click handler
    },
    {
      icon: <FaTruck />,
      label: 'Add Supplier',
      shortcut: 'ctrl + k',
      onClick: handleShowSupplier,
    },
    { icon: <FaFileExport />, label: 'Export', shortcut: 'ctrl + s' },
  ];

  return (
    <>
      <ListGroup variant="flush">
        {actions.map((action, idx) => (
          <ListGroup.Item
            key={idx}
            className="d-flex justify-content-between align-items-center border-0"
            style={{ cursor: action.onClick ? 'pointer' : 'default' }}
            onClick={action.onClick}
          >
            <span className="d-flex align-items-center gap-2">
              {action.icon} {action.label}
            </span>
            <span className="text-muted small">{action.shortcut}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modals */}
      <AppAddSupplierForm show={showSupplierModal} handleClose={handleCloseSupplier} />
      <AppAddProductForm show={showProductModal} handleClose={handleCloseProduct} />
    </>
  );
};

export default AppQuickActions;
