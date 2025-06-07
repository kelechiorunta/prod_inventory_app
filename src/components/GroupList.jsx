// GroupList.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../constants';
import { ListGroup, Spinner } from 'react-bootstrap';

export default function GroupList({ userId, onSelectGroup, selectedGroupId }) {
  const { data, loading, error } = useQuery(GET_GROUPS);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error loading groups</p>;

  return (
    <ListGroup variant="flush">
      {data.myGroups.map((group) => (
        <ListGroup.Item
          key={group.id}
          active={selectedGroupId === group.id}
          onClick={() => onSelectGroup(group)}
          style={{ cursor: 'pointer' }}
        >
          🧑‍🤝‍🧑 {group.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
