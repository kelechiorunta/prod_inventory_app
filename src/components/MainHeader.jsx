import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
const MainHeader = ({ auth }) => {
  
  return (
    <Navbar style={{position: 'fixed', top: 0, left: 0, zIndex: 50, width: '100%'}} className='fixed top-0 left-0' bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
            <a className="navbar-brand" href="/">ShopMate</a>
              {auth && <img src={auth && auth.picture} style={{ borderRadius: '50%', margin: 'auto' }} width={50} height={50} alt='avatar' />}
        
        <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                
            <Nav className="ms-auto">
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/newProduct">Add Product</a>
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


