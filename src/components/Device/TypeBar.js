import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <ListGroup>
      <ListGroup.Item
        style={{cursor: 'pointer'}}
        active={device.selectedType.id === undefined}
        onClick={()=>device.setSelectedType({})}
      >
        Все типы
      </ListGroup.Item>
      {device.types.map(type =>
        <ListGroup.Item
          style={{cursor: 'pointer'}}
          active={device.selectedType.id === type.id}
          onClick={()=>device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;