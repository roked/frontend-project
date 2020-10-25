import React  from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

//define the default layout component
//the child components go inside using props.children
const NavbarL = (props) => ( 
    <div> 
        <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#">Real Estate Listing</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>                
                </Nav>
                 <Nav className="ml-auto">
                  <Nav.Link href="/register">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Sign In</Nav.Link>                
                </Nav>
              </Navbar.Collapse>
        </Navbar>
        {props.children}
    </div> 
);
        
export default NavbarL;
