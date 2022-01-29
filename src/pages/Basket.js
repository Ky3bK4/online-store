import React, {useContext, useEffect} from 'react';
import {fetchBasket} from "../http/basketApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BasketItem from "../components/Basket/BasketItem";
import {Container, Row} from "react-bootstrap";

const Basket = observer(() => {
  const {basket, basket: {basketDevices}} = useContext(Context)

  useEffect(() => {
    fetchBasket().then(({data}) => basket.setBasketDevices(data))
  },[])


  if(basketDevices.count > 0) {
    let newDevicesArr = {}
    newDevicesArr = basketDevices.rows.map((item, ind, arr) => {
      console.log(arr)
      return item
    })
  }


  return (
    <Container>
      <Row>
        {
          basketDevices.count > 0 && basketDevices.rows.map(item =>
            <BasketItem key={item.id} device={item.device}/>
          )
        }
      </Row>
    </Container>
  );
});

export default Basket;