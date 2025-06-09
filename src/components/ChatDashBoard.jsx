// import React, { useState } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import ChatUsers from './ChatUsers.jsx';
// import ChatNotifications from './ChatNotifications.jsx';
// import { useParams } from 'react-router-dom'; // assuming route: /chat/:userId

// export default function ChatDashboard() {
//   const { userId } = useParams();          // logged-in user id from route
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <Container style={{paddingTop: '4rem'}} fluid className="mt-3">
//       <Row>
//         {/* Sidebar */}
//         <Col xs={12} md={4} lg={3} className="mb-3">
//           <Card className="h-100 shadow-sm" style={{height: '75vh'}}>
//             <Card.Header>Contacts</Card.Header>
//             <Card.Body style={{ padding: 0, overflowY: 'auto', minHeight: '75vh' }}>
//               <ChatUsers
//                 currentUserId={userId}
//                 selectedId={selectedUser?._id}
//                 contactName={selectedUser?.username}
//                 contactAvatar={selectedUser?.picture}
//                 onSelect={(user) => setSelectedUser(user)}
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Chat box */}
//         <Col xs={12} md={8} lg={9}>
//           {selectedUser ? (
//             <ChatNotifications
//               userId={userId}
//               contactId={selectedUser._id}
//               contactName={selectedUser?.username}
//               contactAvatar={selectedUser?.picture}
//               key={selectedUser._id} // re-mount on contact switch
//             />
//           ) : (
//             <Card
//             className="d-flex align-items-center justify-content-center"
//             style={{ height: '82vh' }}
//           >
//             <h5 className="text-muted">Select a contact to start chatting</h5>
//           </Card>
          
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ChatUsers from './ChatUsers.jsx';
import ChatNotifications from './ChatNotifications.jsx';
import GroupChatBox from './GroupChatBox.jsx';
import CreateGroupModal from './CreateGroupModal.jsx'; // ← Import it
import { useParams } from 'react-router-dom';
import GroupList from './GroupList.jsx';

export default function ChatDashboard() {
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const isGroupChat = Boolean(selectedGroup);

  const handleGroupCreated = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  return (
    <Container fluid className="mt-3" style={{ paddingTop: '4rem', fontFamily: 'Cinzel' }}>
      <Row>
        <Col xs={12} md={4} lg={3} className="mb-3">
          <Card className="h-100 shadow-sm" style={{ height: '75vh' }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              Contacts
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => setShowCreateGroup(true)}
              >
                New Group
              </Button>
            </Card.Header>
            <Card.Body style={{ padding: 0, overflowY: 'auto' }}>
              <ChatUsers
                currentUserId={userId}
                selectedId={selectedUser?._id}
                onSelect={(user) => {
                  setSelectedUser(user);
                  setSelectedGroup(null);
                }}
              />
              <hr className="my-2" />
              <GroupList
                userId={userId}
                onSelectGroup={(group) => {
                  setSelectedGroup(group);
                  setSelectedUser(null);
                }}
                selectedGroupId={selectedGroup?.id}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8} lg={9}>
          {isGroupChat ? (
            <GroupChatBox
              userId={userId}
              groupId={selectedGroup.id}
              groupName={selectedGroup.name}
              key={selectedGroup.id}
            />
          ) : selectedUser ? (
            <ChatNotifications
              userId={userId}
              contactId={selectedUser._id}
              contactName={selectedUser?.username}
              contactAvatar={selectedUser?.picture}
              key={selectedUser._id}
            />
          ) : (
            <Card
              className="d-flex align-items-center justify-content-center"
              style={{ height: '82vh' }}
            >
              <h5 className="text-muted">Select a contact or group to start chatting</h5>
            </Card>
          )}
        </Col>
      </Row>

      <CreateGroupModal
        show={showCreateGroup}
        handleClose={() => setShowCreateGroup(false)}
        currentUserId={userId}
        onGroupCreated={handleGroupCreated}
      />
    </Container>
  );
}
