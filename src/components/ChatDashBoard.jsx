import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ChatUsers from './ChatUsers.jsx';
import ChatNotifications from './ChatNotifications.jsx';
import { useParams } from 'react-router-dom'; // assuming route: /chat/:userId

export default function ChatDashboard() {
  const { userId } = useParams();          // logged-in user id from route
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Container style={{paddingTop: '4rem'}} fluid className="mt-3">
      <Row>
        {/* Sidebar */}
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Card className="h-100 shadow-sm" style={{height: '75vh'}}>
            <Card.Header>Contacts</Card.Header>
            <Card.Body style={{ padding: 0, overflowY: 'auto', minHeight: '75vh' }}>
              <ChatUsers
                currentUserId={userId}
                selectedId={selectedUser?._id}
                contactName={selectedUser?.username}
                contactAvatar={selectedUser?.picture}
                onSelect={(user) => setSelectedUser(user)}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Chat box */}
        <Col xs={12} md={8} lg={9}>
          {selectedUser ? (
            <ChatNotifications
              userId={userId}
              contactId={selectedUser._id}
              contactName={selectedUser?.username}
              contactAvatar={selectedUser?.picture}
              key={selectedUser._id} // re-mount on contact switch
            />
          ) : (
            <Card
            className="d-flex align-items-center justify-content-center"
            style={{ height: '90vh' }}
          >
            <h5 className="text-muted">Select a contact to start chatting</h5>
          </Card>
          
          )}
        </Col>
      </Row>
    </Container>
  );
}
