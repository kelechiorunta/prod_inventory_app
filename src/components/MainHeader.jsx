import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const MainHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <a className="navbar-brand" href="/">ShopMate</a>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/about">About Us</a>
            <a className="nav-link" href="/products">Products</a>
            <a className="nav-link" href="/checkout">Checkout</a>
            <a className="nav-link" href="/logout">Logout</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;


