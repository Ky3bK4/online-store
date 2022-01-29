import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const {device} = useContext(Context);
  const brands = device.brands
  console.log(brands)

  if(!device.devices.length) {
    return <Row className="mt-4">
      Товары отсутствуют
    </Row>
  }
  return (
    <Row className="mt-4">
      {device.devices.map((item) =>
        <DeviceItem key={item.id} device={item} selectedBrand={brands.find(brand => brand.id === item.brandId)}/>
      )}
    </Row>
  );
});

export default DeviceList;