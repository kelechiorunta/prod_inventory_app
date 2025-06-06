// ChatBox.js
import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE, ON_NEW_MESSAGE, TYPING_INDICATOR } from '../constants'
import {
  Card,
  Form,
  Button,
  InputGroup,
  ListGroup,
  Image
} from 'react-bootstrap';
import { BsSend, BsChatDots } from 'react-icons/bs';
import debounce from 'lodash.debounce'; // First, install lodash.debounce: npm i lodash.debounce
import { SEND_TYPING_STATUS } from '../constants'; // Ensure it's imported

export default function ChatNotifications({userId, contactId, contactName, contactAvatar}) {
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
  const [isContactTyping, setIsContactTyping] = useState(false);
  const [sendTypingStatus] = useMutation(SEND_TYPING_STATUS);

  const { data: typingData } = useSubscription(TYPING_INDICATOR, {
    variables: {
      senderId: contactId, // the one you're chatting *with*
      receiverId: userId   // you
    },
    fetchPolicy: 'no-cache'
  });

  const debounceTyping = useRef(
    debounce((isTyping) => {
      sendTypingStatus({
        variables: {
          senderId: userId,
          receiverId: contactId,
          isTyping: true,
        }
      });
    }, 500)
  ).current;
  
  const typingTimeout = useRef(null);

  const handleTyping = (value) => {
    setContent(value);
    debounceTyping(true);
  
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      debounceTyping(false);
    }, 1500); // stop typing after 1.5s of inactivity
  };
  
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (typingData?.typingIndicator) {
      const { isTyping } = typingData.typingIndicator;

      if (isTyping) {
        setIsContactTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsContactTyping(false);
        }, 2000);
      } else {
        setIsContactTyping(false);
      }
    }
  
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [typingData]);  

  return (
    <Card className="shadow-lg"
    style={{minHeight: '470px'}}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <BsChatDots className="me-2" />
        <div style={{height: '30px', margin: 'auto'}}>
          {isContactTyping && (
            <div className="text-muted small px-3 py-1 d-flex align-items-center">
              <span className="me-2">{contactName} is typing</span>
              <div className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>
        <span>Chat with {contactName}</span>
      </Card.Header>

      <Card.Body style={{ maxHeight: '470px', overflowY: 'auto', minHeight: '470px' }}>
        <ListGroup variant="flush">
          {messages && messages.length === 0 && (
            <ListGroup.Item
              className="text-muted text-center"
              style={{minHeight: '470px' }}>
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
                        
                    {/* {(isContactTyping) && (
                      <div className="text-muted small px-3 py-1 d-flex align-items-center">
                        <span className="me-2">{contactName} is typing</span>
                        <div className="typing-dots">
                          <span>.</span><span>.</span><span>.</span>
                        </div>
                      </div>
                    )} */}
                    <div className="small fw-bold">
                        {msg.sender === userId ?
                          <Image src={msg.senderAvatar} roundedCircle width={32} height={32} />
                            :
                          <Image src={contactAvatar} roundedCircle width={32} height={32} />
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
            onChange={(e) => {
              handleTyping(e.target.value)
            }}
            // onBlur={() => debounceTyping(false)}
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

