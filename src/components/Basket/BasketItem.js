import React from 'react';
import {Card} from 'react-bootstrap'
const BasketItem = ({device}) => {
  return (
    <Card>
      <Card.Title>{device.name}</Card.Title>
    </Card>
  );
};

export default BasketItem;