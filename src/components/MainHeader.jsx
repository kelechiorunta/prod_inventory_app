import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_PRODUCTS } from '../constants';
import { ViewContext } from './ViewContext';
import ThemeToggleButton from './ThemeToggleButton';

const MainHeader = ({ auth }) => {

    const { clearViewState } = useContext(ViewContext)

    const { loading, error, data } = useQuery(FETCH_PRODUCTS, {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    });
    
  const handleLogout = () => {
    try {
      clearViewState();
      window.location.href = '/logout'
    }
    catch (err) {
      console.error('Unable to Logout', err)
    }
  }
    //   if (error) return <h1>Something went wrong</h1>;
    //   if (loading) return <h1>Loading...</h1>;
  
  return (
    <Navbar style={{ fontFamily: 'Cinzel', position: 'fixed', top: 0, left: 0, zIndex: 50, width: '100%'}} className='fixed top-0 left-0' bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
            <Link className="navbar-brand" to="/">ShopMate</Link>
            <img src={data && data?.auth && data?.auth?.picture ? data?.auth?.picture : './avatar.png'} style={{ borderRadius: '50%', margin: 'auto' }} width={30} height={30} alt='avatar' />
        
        <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                
            <Nav className="ms-auto">
                <Link className="nav-link" to="/">Home</Link>
                {data && data?.auth?.username.startsWith("Kelechi") &&
                    <Link className="nav-link" to="/product">Add Product</Link>
                }
                {/* <a className="nav-link" href="/about">About Us</a> */}
                <Link className="nav-link" to="/search">Search</Link>
                <a className="nav-link" href={`/chat/${data && data?.auth?._id}`}>Chat</a>
                <Link className="nav-link" to={`/dashboard`}>DashBoard</Link>
                {/* <a className="nav-link" href="/checkout">Checkout</a> */}
                <a onClick={handleLogout} className="nav-link" href="/logout">Logout</a>
                <ThemeToggleButton/>
            </Nav>
                    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;


