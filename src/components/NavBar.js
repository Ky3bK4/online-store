import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {FaShoppingCart} from 'react-icons/fa'
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false)
    navigate(LOGIN_ROUTE)
    localStorage.setItem("token", '')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <NavLink to={SHOP_ROUTE} className="nav-link text-white" style={{}}>Online-store</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          {user.isAuth ?
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{maxHeight: '100px'}}
              navbarScroll
            >
              <NavLink
                to={BASKET_ROUTE}
                className="btn btn-primary me-2"
              >
                <FaShoppingCart/>
              </NavLink>
              <NavLink
                to={ADMIN_ROUTE}
                className="btn btn-primary"
              >
                Админ-панель
              </NavLink>
              <Button
                variant={"outline-light"}
                className="ms-2"
                onClick={logOut}
              >
                Выйти
              </Button>
            </Nav>
            :
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{maxHeight: '100px'}}
              navbarScroll
            >
              <Button
                variant={"outline-light"}
                onClick={()=>navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </Button>
            </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;