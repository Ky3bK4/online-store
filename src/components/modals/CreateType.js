import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {createType} from "../../http/deviceApi";
const CreateType = ({show, onHide}) => {

  const [value, setValue] = useState('')
  const onSubmit = (e) => {
    e.preventDefault();
    createType(value).then(()=> setValue(''))

  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название типа"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button
          variant="outline-success"
          onClick={onSubmit}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;