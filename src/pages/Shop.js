import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Device/TypeBar";
import BrandBar from "../components/Device/BrandBar";
import DeviceList from "../components/Device/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pages from "../components/Device/Pages";
import {fetchAllDevices, fetchBrands, fetchTypes} from "../http/deviceApi";

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(types => device.setTypes(types))
    fetchBrands().then(brands => device.setBrands(brands))

  },[device])

  useEffect(() => {
    fetchAllDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(devices => {
      device.setDevices(devices.rows)
      device.setTotalCount(devices.count)
    })
  },[device.selectedType, device.selectedBrand, device.page, device.limit])

  return (
    <Container>
      <Row className="mt-4">
        <Col md={3} lg={2} >
          <TypeBar/>
        </Col>
        <Col md={9} lg={10}>
          <BrandBar/>
          <DeviceList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;