// // GroupChatBox.js
// import React, { useEffect, useRef, useState } from 'react';
// import { useMutation, useQuery, useSubscription } from '@apollo/client';
// import {
//   GET_GROUP_MESSAGES,
//   SEND_GROUP_MESSAGE,
//   ON_NEW_GROUP_MESSAGE,
//   SEND_GROUP_TYPING_STATUS,
//   GROUP_TYPING_INDICATOR
// } from '../constants.js';
// import {
//   Card,
//   Form,
//   Button,
//   InputGroup,
//   ListGroup,
//   Image
// } from 'react-bootstrap';
// import { BsSend, BsChatDots } from 'react-icons/bs';
// import debounce from 'lodash.debounce';

// export default function GroupChatBox({ userId, groupId, userName, userAvatar }) {
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState('');
//   const chatEndRef = useRef(null);
//   const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
//   const typingTimeoutRef = useRef(null);

//   const { data: groupMessagesData } = useQuery(GET_GROUP_MESSAGES, {
//     variables: { groupId },
//   });

//   const { data: newGroupMessageData } = useSubscription(ON_NEW_GROUP_MESSAGE, {
//     variables: { groupIds: [groupId] },
//   });

//   const { data: typingData } = useSubscription(GROUP_TYPING_INDICATOR, {
//     variables: { groupIds: [groupId], sender: userId },
//   });

//   const [sendGroupMessage] = useMutation(SEND_GROUP_MESSAGE);
//   const [sendTyping] = useMutation(SEND_GROUP_TYPING_STATUS);

//   useEffect(() => {
//     if (groupMessagesData?.groupMessages) {
//       setMessages(groupMessagesData.groupMessages);
//     }
//   }, [groupMessagesData]);

//   useEffect(() => {
//     if (newGroupMessageData?.newGroupMessage) {
//       setMessages((prev) => [...prev, newGroupMessageData.newGroupMessage]);
//     }
//   }, [newGroupMessageData]);

//   useEffect(() => {
//     if (!typingData?.groupTypingIndicator) return;

//     const { isTyping } = typingData.groupTypingIndicator;

//     if (isTyping) {
//       setIsSomeoneTyping(true);
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => setIsSomeoneTyping(false), 2000);
//     } else {
//       setIsSomeoneTyping(false);
//     }

//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, [typingData]);

//   const handleSend = async () => {
//     if (!content.trim()) return;
  
//     try {
//       const { data } = await sendGroupMessage({
//         variables: {
//           groupId,
//           sender: userId,
//           senderName: userName,
//           content,
//         },
//       });
  
//       if (data?.sendGroupMessage) {
//         setMessages((prev) => [...prev, data.sendGroupMessage]);
//       }
  
//       setContent('');
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };
  

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const debounceTyping = useRef(
//     debounce((isTyping) => {
//       sendTyping({
//         variables: {
//           groupId,
//           sender: userId,
//           senderName: userName,
//           isTyping,
//         },
//       });
//     }, 500)
//   ).current;

//   const handleTyping = (value) => {
//     setContent(value);
//     debounceTyping(true);
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => debounceTyping(false), 1500);
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <Card className="shadow-lg" style={{ minHeight: '470px' }}>
//       <Card.Header>
//         <BsChatDots className="me-2" /> Group Chat - {groupId}
//         {isSomeoneTyping && (
//           <div className="text-muted small px-3 py-1 d-flex align-items-center">
//             <span className="me-2">Someone is typing</span>
//             <div className="typing-dots">
//               <span>.</span><span>.</span><span>.</span>
//             </div>
//           </div>
//         )}
//       </Card.Header>

//       <Card.Body style={{ maxHeight: '470px', overflowY: 'auto' }}>
//         <ListGroup variant="flush">
//           {messages.map((msg) => (
//             <div key={msg.id} className={`d-flex mb-1 ${msg.sender === userId ? 'justify-content-end' : 'justify-content-start'}`}>
//               <ListGroup.Item
//                 className={`rounded px-3 py-2 mb-1 ${msg.sender === userId ? 'bg-light text-end' : 'bg-primary text-white text-start'}`}
//                 style={{ width: 'max-content' }}
//               >
//                 <div className="small fw-bold d-flex align-items-center">
//                   <Image
//                     src={msg.senderAvatar || userAvatar}
//                     roundedCircle
//                     width={24}
//                     height={24}
//                     className="me-2"
//                   />
//                   {msg.senderName}
//                 </div>
//                 <div>{msg.content}</div>
//                 <div className="text-muted small">
//                   {new Date(Number(msg.createdAt)).toLocaleTimeString()}
//                 </div>
//               </ListGroup.Item>
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </ListGroup>
//       </Card.Body>

//       <Card.Footer>
//         <Form onSubmit={(e) => e.preventDefault()}>
//           <InputGroup>
//             <Form.Control
//               as="textarea"
//               rows={1}
//               placeholder="Type a message..."
//               value={content}
//               onChange={(e) => handleTyping(e.target.value)}
//               onKeyDown={handleKeyPress}
//             />
//             <Button variant="primary" onClick={handleSend}>
//               <BsSend />
//             </Button>
//           </InputGroup>
//         </Form>
//       </Card.Footer>
//     </Card>
//   );
// }

// GroupChatBox.js
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  GET_GROUP_MESSAGES,
  SEND_GROUP_MESSAGE,
  ON_NEW_GROUP_MESSAGE,
  SEND_GROUP_TYPING_STATUS,
  GROUP_TYPING_INDICATOR
} from '../constants.js';
import {
  Card,
  Form,
  Button,
  InputGroup,
  ListGroup,
  Image
} from 'react-bootstrap';
import { BsSend, BsChatDots } from 'react-icons/bs';
import debounce from 'lodash.debounce';

export default function GroupChatBox({ userId, groupId, userName, userAvatar }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const chatEndRef = useRef(null);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [typingUserName, setTypingUserName] = useState('');
  const typingTimeoutRef = useRef(null);

  const { data: groupMessagesData } = useQuery(GET_GROUP_MESSAGES, {
    variables: { groupId },
  });

  const { data: newGroupMessageData } = useSubscription(ON_NEW_GROUP_MESSAGE, {
    variables: { groupIds: [groupId] },
  });

  const { data: typingData } = useSubscription(GROUP_TYPING_INDICATOR, {
    variables: { groupId },
  });

  const [sendGroupMessage] = useMutation(SEND_GROUP_MESSAGE);
  const [sendTyping] = useMutation(SEND_GROUP_TYPING_STATUS);

  useEffect(() => {
    if (groupMessagesData?.groupMessages) {
      setMessages(groupMessagesData.groupMessages);
    }
  }, [groupMessagesData]);

  useEffect(() => {
    if (newGroupMessageData?.newGroupMessage) {
      setMessages((prev) => [...prev, newGroupMessageData.newGroupMessage]);
    }
  }, [newGroupMessageData]);

  useEffect(() => {
    if (!typingData?.groupTypingIndicator) return;

    const { isTyping, senderName, sender } = typingData.groupTypingIndicator;

    if (sender === userId) return;

    if (isTyping) {
      setIsSomeoneTyping(true);
      setTypingUserName(senderName);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsSomeoneTyping(false), 2000);
    } else {
      setIsSomeoneTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [typingData]);

  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      const { data } = await sendGroupMessage({
        variables: {
          groupId,
          sender: userId,
          content,
        },
      });

      if (data?.sendGroupMessage) {
        setMessages((prev) => [...prev, data.sendGroupMessage]);
      }

      setContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const debounceTyping = useRef(
    debounce((isTyping) => {
      sendTyping({
        variables: {
          groupId,
          sender: userId,
          isTyping,
        },
      });
    }, 500)
  ).current;

  const handleTyping = (value) => {
    setContent(value);
    debounceTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => debounceTyping(false), 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="shadow-lg" style={{ minHeight: '470px' }}>
      <Card.Header>
        <BsChatDots className="me-2" /> Group Chat - {groupId}
        {isSomeoneTyping && (
          <div className="text-muted small px-3 py-1 d-flex align-items-center">
            <span className="me-2">{typingUserName} is typing</span>
            <div className="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </Card.Header>

      <Card.Body style={{ maxHeight: '470px', overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {messages.map((msg) => (
            <div key={msg.id} className={`d-flex mb-1 ${msg.sender === userId ? 'justify-content-end' : 'justify-content-start'}`}>
              <ListGroup.Item
                className={`rounded px-3 py-2 mb-1 ${msg.sender === userId ? 'bg-light text-end' : 'bg-primary text-white text-start'}`}
                style={{ width: 'max-content' }}
              >
                <div className="small fw-bold d-flex align-items-center">
                  <Image
                    src={msg.senderAvatar || userAvatar}
                    roundedCircle
                    width={24}
                    height={24}
                    className="me-2"
                  />
                  {msg.senderName}
                </div>
                <div>{msg.content}</div>
                <div className="text-muted small">
                  {new Date(Number(msg.createdAt)).toLocaleTimeString()}
                </div>
              </ListGroup.Item>
            </div>
          ))}
          <div ref={chatEndRef} />
        </ListGroup>
      </Card.Body>

      <Card.Footer>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Type a message..."
              value={content}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button variant="primary" onClick={handleSend}>
              <BsSend />
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
}
