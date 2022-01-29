import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal, Dropdown, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchAllDevices, fetchBrands, fetchTypes} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context);

  useEffect(() => {
    fetchTypes().then(types => device.setTypes(types))
    fetchBrands().then(brands => device.setBrands(brands))
    fetchAllDevices().then(devices => device.setDevices(devices.rows))
  },[])

  const [info, setInfo] = useState([])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState(null)
  const [brand, setBrand] = useState(null)
  const [file, setFile] = useState(null)

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', id: Date.now()}])
  }

  const changeInfo = (key, value, id) => {
    setInfo(info.map(i=> {
      if(i.id === id) {
        return {
          ...i,
          [key]: value
        }
      }
      return i
    }))
  }

  const deleteInfo = id => {
    setInfo(info.filter(i => i.id !== id))
  }

  const onClose = () => {
    setName('')
    setPrice('')
    setType(null)
    setBrand(null)
    onHide()
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('img', file)
    formData.append('brandId', brand.id)
    formData.append('typeId', type.id)
    formData.append('info', JSON.stringify(info))

    createDevice(formData).then(data=>onClose());
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
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
        <Form>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>
              {type ? type.name : 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) =>
                <Dropdown.Item
                  key={type.id}
                  onClick={()=>setType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle>
              {brand ? brand.name : 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) =>
                <Dropdown.Item
                  key={brand.id}
                  onClick={()=>setBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            placeholder="Введите название"
            className="mt-3 mb-2"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <Form.Control
            placeholder="Введите стоимость"
            className="mb-2"
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />
          <Form.Control
            placeholder="Введите название"
            size="sm"
            onChange={selectFile}
            type="file"
          />
          <hr/>
          <Button
            variant="outline-primary"
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {
            info.map((i) =>
            <Row className="mt-3" key={i.id}>
              <Col md={4}>
                <Form.Control
                  placeholder="Название характеристики"
                  value={i.title}
                  onChange={ e=> changeInfo('title', e.target.value, i.id)}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  placeholder="Значение характеристики"
                  value={i.description}
                  onChange={ e=> changeInfo('description', e.target.value, i.id)}
                />
              </Col>
              <Col md={2}>
                <Button
                  variant="outline-danger"
                  onClick={()=>deleteInfo(i.id)}
                >
                  x
                </Button>
              </Col>
            </Row>
            )
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onClose}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;