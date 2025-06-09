
// import React, { useState } from 'react';
// import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaBoxes,
//   FaClipboardList,
//   FaTruck,
//   FaChartBar,
//   FaQuestionCircle,
//   FaCog,
// } from 'react-icons/fa';

// const AppSidebar = () => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Toggle for small screens */}
//       <Navbar bg="light" expand="lg" className="d-lg-none px-3">
//         <Button
//           onClick={() => setOpen(!open)}
//           aria-controls="sidebar"
//           aria-expanded={open}
//         >
//           ☰ Menu
//         </Button>
//       </Navbar>

//       {/* Sidebar */}
//       <div className={`bg-light sidebar d-lg-block ${open ? '' : 'd-none d-lg-block'}`} style={{backgroundColor: '#f5f7ff'}}>
//         <Collapse in={open || window.innerWidth >= 992}>
//           <div id="sidebar" className="p-3 border-end" style={{ minHeight: '100vh' }}>
//             <h5 className="mb-3">General</h5>
//             <Nav className="flex-column">
//             <Nav.Link
//               as={NavLink}
//               to="/dashboard/page1"
//               className={`d-flex align-items-center px-3 py-2 ${
//                 location.pathname === '/dashboard/page1' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
//               }`}
//             >
//               <FaTachometerAlt className="me-2" />
//               Dashboard
//             </Nav.Link>

//             <Nav.Link
//               as={NavLink}
//               to="/dashboard/page2"
//               className={`d-flex align-items-center px-3 py-2 ${
//                 location.pathname === '/dashboard/page2' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
//                   }`}>
//                 <FaBoxes className="me-2" />
//                 Inventory
//               </Nav.Link>
//               <Nav.Link as={NavLink} to="page3"><FaClipboardList className="me-2" />Sales Orders</Nav.Link>
//               <Nav.Link href="#"><FaTruck className="me-2" />Suppliers</Nav.Link>
//               <Nav.Link href="#"><FaChartBar className="me-2" />Reports</Nav.Link>
//             </Nav>

//             <hr />

//             <h5 className="mb-3">Support</h5>
//             <Nav className="flex-column">
//               <Nav.Link href="#"><FaQuestionCircle className="me-2" />Help</Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/dashboard/settings"
//                 className={`d-flex align-items-center px-3 py-2 ${
//                 location.pathname === '/dashboard/settings' ? 'bg-primary text-white fw-bold ' : 'bg-transparent text-#5294fd'
//                   }`}>
//                 <FaCog className="me-2" />
//                 Settings
//               </Nav.Link>
//             </Nav>
//           </div>
//         </Collapse>
//       </div>
//     </>
//   );
// };

// export default AppSidebar;


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
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
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen resize to apply mobile logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItem = (to, icon, label) => (
    <Nav.Link
      as={NavLink}
      to={to}
      className={`d-flex align-items-center px-3 py-2 ${
        location.pathname === to ? 'bg-primary text-white fw-bold' : 'text-dark'
      }`}
    >
      {icon}
      {!isMobile && <span className="ms-2">{label}</span>}
    </Nav.Link>
  );

  return (
    <>
      {/* Toggle for mobile screens if you still want the menu to collapse */}
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
      <div
        className={`bg-light sidebar d-block border-end`}
        style={{
          minHeight: '100vh',
          width: isMobile ? '4rem' : '14rem',
          backgroundColor: '#f5f7ff',
          transition: 'width 0.3s ease-in-out',
          fontFamily: 'Cinzel',
        }}
      >
        <Collapse in={open || !isMobile}>
          <div id="sidebar" className="p-3">
            {!isMobile && <h5 className="mb-3">General</h5>}
            <Nav className="flex-column">
              {navItem('/dashboard/page1', <FaTachometerAlt />, 'Dashboard')}
              {navItem('/dashboard/page2', <FaBoxes />, 'Inventory')}
              {navItem('/dashboard/page3', <FaClipboardList />, 'Sales Orders')}
              {navItem('/dashboard/page4', <FaTruck />, 'Suppliers')}
              {navItem('/dashboard/page5', <FaChartBar />, 'Reports')}
            </Nav>

            {!isMobile && <hr className="my-3" />}
            {!isMobile && <h5 className="mb-3">Support</h5>}
            <Nav className="flex-column">
              {navItem('/dashboard/help', <FaQuestionCircle />, 'Help')}
              {navItem('/dashboard/settings', <FaCog />, 'Settings')}
            </Nav>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default AppSidebar;
