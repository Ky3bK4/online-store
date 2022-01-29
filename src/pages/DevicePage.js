import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useParams} from "react-router-dom";
import {fetchDevice} from "../http/deviceApi";

const DevicePage = () => {
  const {id} = useParams()
  const [device, setDevice] = useState({info:[]})

  useEffect(()=>{
      fetchDevice(id).then(data=> setDevice(data))
  },[id])

  return (
    <Container className="mt-4">
      <Row>
        <Col md={7}>
          <Card border='light' className="align-items-center">
            <div className="w-100 px-4 mb-4 d-flex mt-3 align-items-center justify-content-between">
              <div>
                Код: <span className='fw-bolder'>{device.id}</span>
              </div>
              <div className='d-flex align-items-center'>
                <ReactStars
                  count={5}
                  edit={false}
                  isHalf={true}
                  size={24}
                  activeColor="#ffd700"
                  value={device.rating}
                />
                <span className="ms-2">{device.rating}</span>
              </div>
            </div>
            {
              device.img && <Image style={{objectFit: 'contain'}} src={process.env.REACT_APP_API_URL + device.img} width={400} height={400}/>
            }
            <hr className="w-100"/>
            <div className="w-100">
              <h5 className="mb-3">Краткие характеристики</h5>
              {device.info.map(info=>
                <Row key={info.id} className="gx-0 mt-2">
                  <Col className="ps-4 text-start" style={{fontSize: '17px'}}>
                    {info.title}: {info.description}
                  </Col>
                </Row>
              )}
            </div>
          </Card>
        </Col>
        <Col md={{span: 4, offset: 1}}>
          <Card className="p-3" border='light'>
            <Row className="align-items-center">
              <Col>
                <div className="fw-bold fs-5 text-primary">{device.name}</div>
                <span className="fs-4 fw-bolder">{device.price}</span> грн
              </Col>
              <Col>
                <Button size="lg" variant={"outline-success"}>
                  Купить
                </Button>
              </Col>
            </Row>
          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default DevicePage;