import React from 'react';
import { Button } from 'react-bootstrap';
import { createPortal } from 'react-dom';

export default function Modal({handleModal, children}) {
  return createPortal(
    <div
      style={{
        inset: 0,
        color: 'white',
        textAlign: 'center',
        fontSize: 50,
        position: 'fixed',
        height: '100vh',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999,
        overflowY: 'scroll'
      }}
    >
      {!children && <h1>Modal</h1>}
      {children}
      {!children && <Button onClick={() => handleModal(false)}>Close Modal</Button>}
    </div>,
    document.getElementById('modal')
  );
}