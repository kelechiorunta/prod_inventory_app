// import React from 'react'
// import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

// export default function AppSidebar() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container md className='col-md-3 col-sm-12 col-lg-3'>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   )
// }

import React, { useState } from 'react';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxes,
  FaClipboardList,
  FaTruck,
  FaChartBar,
  FaQuestionCircle,
  FaCog,
} from 'react-icons/fa';

const AppSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle for small screens */}
      <Navbar bg="light" expand="lg" className="d-lg-none px-3">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="sidebar"
          aria-expanded={open}
        >
          ☰ Menu
        </Button>
      </Navbar>

      {/* Sidebar */}
      <div className={`bg-light sidebar d-lg-block ${open ? '' : 'd-none d-lg-block'}`} style={{backgroundColor: '#f5f7ff'}}>
        <Collapse in={open || window.innerWidth >= 992}>
          <div id="sidebar" className="p-3 border-end" style={{ minHeight: '100vh' }}>
            <h5 className="mb-3">General</h5>
            <Nav className="flex-column">
            <Nav.Link
              as={NavLink}
              to="/dashboard/page1"
              className={`d-flex align-items-center px-3 py-2 ${
                location.pathname === '/dashboard/page1' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
              }`}
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Nav.Link>

              <Nav.Link as={NavLink}
              to="/dashboard/page2"
              className={`d-flex align-items-center px-3 py-2 ${
                location.pathname === '/dashboard/page2' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
                  }`}>
                <FaBoxes className="me-2" />
                Inventory
              </Nav.Link>
              <Nav.Link as={NavLink} to="page3"><FaClipboardList className="me-2" />Sales Orders</Nav.Link>
              <Nav.Link href="#"><FaTruck className="me-2" />Suppliers</Nav.Link>
              <Nav.Link href="#"><FaChartBar className="me-2" />Reports</Nav.Link>
            </Nav>

            <hr />

            <h5 className="mb-3">Support</h5>
            <Nav className="flex-column">
              <Nav.Link href="#"><FaQuestionCircle className="me-2" />Help</Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/dashboard/settings"
                className={`d-flex align-items-center px-3 py-2 ${
                location.pathname === '/dashboard/settings' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
                  }`}>
                <FaCog className="me-2" />
                Settings
              </Nav.Link>
            </Nav>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default AppSidebar;
