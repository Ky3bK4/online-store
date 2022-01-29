import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  return (<Container className="mt-4 d-flex flex-column">
      <Row>
        <Col md={4}>
          <Button
            className="w-100 mb-2"
            variant="outline-success mr-2"
            onClick={() => setTypeVisible(true)}
          >
            Добавить тип
          </Button>
          <Button
            className="w-100 mb-2"
            variant="outline-success"
            onClick={() =>setBrandVisible(true)}

          >
            Добавить бренд
          </Button>
          <Button
            className="w-100"
            variant="outline-success"
            onClick={() =>setDeviceVisible(true)}

          >
            Добавить устройство
          </Button>
        </Col>
      </Row>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>);
};

export default Admin;