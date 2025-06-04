import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';

const items = [
  { name: 'Macbook Pro', img: 'https://via.placeholder.com/40?text=M' },
  { name: 'Iphone 14 pro', img: 'https://via.placeholder.com/40?text=I' },
  { name: 'Zoom75', img: 'https://via.placeholder.com/40?text=Z' },
  { name: 'Airpods Pro', img: 'https://via.placeholder.com/40?text=A' },
  { name: 'Samsung Galaxy Fold', img: 'https://via.placeholder.com/40?text=G' },
  { name: 'Samsung Odyssey', img: 'https://via.placeholder.com/40?text=S' },
  { name: 'Logitech Superlight', img: 'https://via.placeholder.com/40?text=L' },
];

const AppFastMovingItems = () => {
  return (
    <ListGroup variant="flush">
      {items.map((item, idx) => (
        <ListGroup.Item key={idx} className="d-flex align-items-center gap-2 border-0">
          <Image src={item.img} width={30} height={30} roundedCircle alt={item.name} />
          <span>{item.name}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AppFastMovingItems;
