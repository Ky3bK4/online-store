import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
  const {user} = useContext(Context)

  const location = useLocation()
  const navigate = useNavigate()

  const isLogin = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    try {
      let data;
      if(isLogin) {
        data = await login(email,password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch(err) {
      alert(err.response.data.message)
    }

  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация': 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between g-0">
            {!isLogin ?
              <div className="w-auto mt-3">
                Есть аккаунт?
                <NavLink to={LOGIN_ROUTE} className="link link-primary ms-2">Войдите</NavLink>
              </div>
              :
              <NavLink to={REGISTRATION_ROUTE} className="btn btn-outline-primary w-auto mt-3">Регистрация</NavLink>
            }

            <Button
              variant={"outline-success"}
              className="mt-3 w-auto"
              onClick={onSubmit}
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;