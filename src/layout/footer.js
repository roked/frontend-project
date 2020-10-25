import React  from 'react';
import Navbar from 'react-bootstrap/Navbar';

//define the default layout component
//the child components go inside using props.children
const Footer = () => ( 
    <div> 
        <Navbar bg="dark" fixed="bottom" className="flex justify-content-center">
            <p id="white">Created by Mitko Donchev. 😎</p>
        </Navbar>
    </div> 
);
        
export default Footer;
