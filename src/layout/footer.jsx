/**
 * @module Layout/footer
 * @description Page footer functional component
 * @author Mitko Donchev
 */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

/**
 * Define the page footer functional component
 *
 * @name Page footer
 * @returns {DOMRect} the jsx code which represents the footer of all pages
 */
const Footer = () => (
  <div>
    <Navbar bg="dark" fixed="bottom" className="flex justify-content-center">
      <p id="white">Created by Mitko Donchev. 😎</p>
    </Navbar>
  </div>
);

export default Footer;
