// ChatBox.js
import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE, ON_NEW_MESSAGE } from '../constants'
import {
  Card,
  Form,
  Button,
  InputGroup,
  ListGroup,
  Image
} from 'react-bootstrap';
import { BsSend, BsChatDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

export default function ChatNotifications({userId, contactId, contactName}) {
//   const { userId } = useParams(); // current user ID from route
//   const [contactId, setContactId] = useState('Kelechi'); // example contact (you can improve this with a contact list)
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const chatEndRef = useRef(null);

  // Fetch initial message history
  const { data: queryData } = useQuery(GET_MESSAGES, {
    variables: { userId, contactId }
  });

  // Subscribe to incoming/outgoing messages
  const { data: subscriptionData } = useSubscription(ON_NEW_MESSAGE, {
    variables: { userId },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (queryData?.messages) {
      setMessages(queryData.messages);
    }
  }, [queryData, userId, contactId]);

  useEffect(() => {
    if (subscriptionData?.newMessage) {
      const msg = subscriptionData.newMessage;

      // Add to chat if it's between current user and contact
      if (
        (msg.sender === userId && msg.receiver === contactId) ||
        (msg.sender === contactId && msg.receiver === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    }
  }, [subscriptionData, userId, contactId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      await sendMessage({
        variables: {
          sender: userId,
          receiver: contactId,
          content,
        },
      });
      setContent('');
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="shadow-lg"
    style={{minHeight: '75vh'}}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <BsChatDots className="me-2" />
        <span>Chat with {contactName}</span>
      </Card.Header>

      <Card.Body style={{ maxHeight: '400px', overflowY: 'auto', minHeight: '75vh' }}>
        <ListGroup variant="flush">
          {messages && messages.length === 0 && (
            <ListGroup.Item className="text-muted text-center">
              No messages yet.
            </ListGroup.Item>
                  )}
                  
                  {(queryData?.messages && messages) && messages.map((msg) => (
                    <div
                    key={msg.id}
                    className={`d-flex mb-1 ${msg.sender === userId ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                    <ListGroup.Item
                        key={msg.id}
                        style={{width: 'max-content'}}
                    className={`w-max rounded px-3 py-2 mb-1 ${
                        msg.sender === userId
                        ? 'bg-light text-end'
                        : 'bg-primary text-white text-start'
                    }`}
                    >
                    <div className="small fw-bold">
                        {msg.sender === userId ?
                          <Image src={msg.senderAvatar} roundedCircle width={32} height={32} />
                            :
                          <Image src={msg.receiverAvatar} roundedCircle width={32} height={32} />
                        }
                        {msg.sender === userId ? 'You' : msg.senderName}
                    </div>
                    <div>{msg.content}</div>
                        <div className={`text-muted small ${msg.sender !== userId && 'text-white'}`}>
                            {msg.createdAt &&
                                new Date(Number(msg.createdAt)).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                })}
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
              onChange={(e) => setContent(e.target.value)}
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

