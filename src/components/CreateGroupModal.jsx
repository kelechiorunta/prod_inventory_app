// CreateGroupModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Image, Spinner } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, CREATE_GROUP, GET_GROUPS } from '../constants'; // ← make sure these are defined

export default function CreateGroupModal({ show, handleClose, currentUserId, onGroupCreated }) {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const { data, loading, error } = useQuery(GET_USERS);
    //   const [createGroup, { loading: creating }] = useMutation(CREATE_GROUP);
    const [createGroup, { loading: creating }] = useMutation(CREATE_GROUP, {
        refetchQueries: [{ query: GET_GROUPS }]
      });

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = async () => {
    if (!groupName.trim() || selectedUsers.length < 1) return;

    try {
      const { data: mutationData } = await createGroup({
        variables: {
          name: groupName,
          memberIds: [currentUserId, ...selectedUsers],
        },
      });

      if (mutationData?.createGroup) {
        onGroupCreated(mutationData.createGroup);
        setGroupName('');
        setSelectedUsers([]);
        handleClose();
      }
    } catch (err) {
      console.error('Failed to create group:', err);
    }
  };

  useEffect(() => {
    if (!show) {
      setGroupName('');
      setSelectedUsers([]);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </Form.Group>

        <Form.Label>Select Members</Form.Label>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <ListGroup style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {data?.allUsers
              .filter((user) => user._id !== currentUserId)
              .map((user) => (
                <ListGroup.Item
                  key={user._id}
                  onClick={() => toggleSelectUser(user._id)}
                  active={selectedUsers.includes(user._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image src={user.picture} roundedCircle width={32} className="me-2" />
                  {user.username}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating...' : 'Create Group'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
