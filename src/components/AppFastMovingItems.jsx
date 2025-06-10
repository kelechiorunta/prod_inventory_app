import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';
// import mac from '../../public/MacbookPro.png'
import mac from './MacbookPro.png'
import iphone from './iphone 14 pro.png'
import zoom75 from './zoom75.png'
import airpods from './airpodsPro.png'
import samsung from './samsung_galaxy_fold.png'
import odyssey from './samsung_odyssey.png'
import logitech from './logitech_superlight.png'

const items = [
  { name: 'Macbook Pro', img: mac },
  { name: 'Iphone 14 pro', img: iphone },
  { name: 'Zoom75', img: zoom75 },
  { name: 'Airpods Pro', img: airpods },
  { name: 'Samsung Galaxy Fold', img: samsung },
  { name: 'Samsung Odyssey', img: odyssey },
  { name: 'Logitech Superlight', img: logitech },
];

const AppFastMovingItems = () => {
  return (
    <ListGroup variant="flush">
      {items.map((item, idx) => (
        <ListGroup.Item key={idx} className="d-flex align-items-center gap-2 border-0">
          <img src={item.img} width={30} height={30} alt={item.name} style={{borderRadius: '50%', objectFit: 'cover', objectPosition: 'center'}}/>
          <span>{item.name}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AppFastMovingItems;
