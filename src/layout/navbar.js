import React, { 
    useState 
}             from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav    from 'react-bootstrap/Nav';
import { 
    withRouter 
}             from "react-router";

//define the default layout function component
//the child components go inside using props.children
const NavbarL = (props) => {
    //get the user from the props state
    const { user } = props.location.state;
    //check for user (if loged in)
    const [isLoggedIn , setUser] = useState(user ? true : false);  
    
    //set the available buttons
    let userButtons;
    if(isLoggedIn){
        userButtons = <Nav className="ml-auto">
                          <Nav.Link href="/">Profile</Nav.Link>
                          <Nav.Link href="/logout">Sign Out</Nav.Link>                
                      </Nav> 
    } else {
        userButtons = <Nav className="ml-auto">
                          <Nav.Link href="/register">Sign Up</Nav.Link>
                          <Nav.Link href="/login">Sign In</Nav.Link>                
                      </Nav>
    }
    
    return(     
        <div> 
            <Navbar bg="dark" variant="dark" expand="lg">
                  <Navbar.Brand href="#">Real Estate Listing</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/about">About</Nav.Link>                
                    </Nav>
                    {userButtons}
                  </Navbar.Collapse>
            </Navbar>
            {props.children}
        </div> 
    );
} 

export default withRouter(NavbarL);
