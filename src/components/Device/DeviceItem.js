import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from '../../assets/ant-design_star-outlined.svg'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../utils/consts";
import {FaCartArrowDown} from 'react-icons/fa'

const DeviceItem = ({device, selectedBrand}) => {
  const navigate = useNavigate();
  console.log(selectedBrand)
  return (
    <Col md={4} lg={3} className="mt-3 gl-0">
      <Card
        className="p-2 h-100"
        style={{ cursor: "pointer"}}
        border={'light'}
        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
      >
        <Image style={{objectFit: 'contain'}} className="p-2 mx-auto" height={200} width={'100%'} src={process.env.REACT_APP_API_URL + device.img}/>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="text-black-50">{selectedBrand?.name}</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image src={star}/>
          </div>
        </div>
        <div className="fw-bold mt-1 text-start" style={{fontSize:'15px'}}>{device.name}</div>
        <hr/>
        <div className="fs-6 text-start d-flex justify-content-between align-items-center">
          <div>
            {device.price} грн
          </div>
          <Button>
            <FaCartArrowDown/>
          </Button>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;