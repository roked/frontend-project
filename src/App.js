//Read more why to use functions https://stackoverflow.com/questions/36097965/when-to-use-es6-class-based-react-components-vs-functional-es6-react-components

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//import all pages at once
import { Home, Login, About, Register, Property, NewProperty } from './components'
//import the layout component
import { NavbarL, Footer } from './layout';
//import css style
import './App.css';

//wrapping everything inside Layout component
//define and export the app function 
export default function App() {
    return (
        <Router>
            <NavbarL />
            <Switch>
                <Route path="/property/new">
                    <NewProperty />
                </Route>
                <Route path="/property">
                    <Property />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </Router>
        );
}
        