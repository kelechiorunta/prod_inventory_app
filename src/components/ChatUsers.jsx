import React from 'react';
import { ListGroup, Spinner, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { FETCH_USERS } from '../constants.js';
import Modal from './Modal.jsx';

export default function ChatUsers({ currentUserId, onSelect, selectedId,  }) {
  const { data, loading, error } = useQuery(FETCH_USERS, {
    variables: { excludeId: currentUserId },
  });

  if (loading) return <Modal isActive={loading}><Spinner animation="border" /></Modal>;
  if (error)   return <p className="text-danger">Error loading users</p>;

  return (
    <ListGroup variant="flush" style={{minHeight: '73vh'}}>
      {data.users.map((user) => (
        <ListGroup.Item
          key={user._id}
          action
          active={selectedId === user._id}
          onClick={() => onSelect(user)}
          className="d-flex align-items-center gap-2"
        >
          {user?.picture && (
            <Image src={user.picture} roundedCircle width={32} height={32} />
          )}
          <span>{user.username}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
