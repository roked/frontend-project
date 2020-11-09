import React, { 
    useState,
    useEffect
}             from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav    from 'react-bootstrap/Nav';
import fetch  from 'node-fetch';
import base64 from 'base-64';
import { 
    withRouter 
}             from "react-router";

//define the default layout function component
//the child components go inside using props.children
const NavbarL = (props) => {
    //get the user from the props state
    let user;
    if(props.location.state){
        user = props.location.state.user;
    } else {
        user = false;
    }
    //check for user (if loged in)
    const [isLoggedIn , setUser] = useState(user ? true : false);  
    
     //this function runs when the user click sign out
    const handleSignOut = (e) => {   
        e.preventDefault();
        //create user object

        //send the user object
        async function singOutUser() {
            try{
                //send HTTP request
                await signOut();                 
                setUser(false)
                
                //redirect to home page
                //pass the loged user
                props.history.push({
                  pathname: '/login',                  
                  state: { user: isLoggedIn }
                });
            } catch (err) {
                console.log(err);
            }
        }   
        
        //call postData
        singOutUser();           
        
    }
    
    useEffect(()=> {
        setUser(user);
    },[user]);
    
    //go back to home
    const goHome = () => {  
        try{
             //redirect to homepage
             props.history.push({
                 pathname:'/', 
                 state: { user: user }
             });
         } catch (err) {
             console.log(err);
         }   
    };  
    
    //go back to about page
    const goAbout = () => {  
        try{
             //redirect to about
             props.history.push({
                 pathname:'/about', 
                 state: { user: user }
             });
         } catch (err) {
             console.log(err);
         }   
    };  
    
    //set the available buttons
    let userButtons;
    if(isLoggedIn){
        userButtons = <Nav className="ml-auto">
                          <Nav.Link href="/">Profile</Nav.Link>
                          <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>                
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
                      <Nav.Link onClick={()=> goHome()}>Home</Nav.Link>
                      <Nav.Link onClick={()=> goAbout()}>About</Nav.Link>                
                    </Nav>
                    {userButtons}
                  </Navbar.Collapse>
            </Navbar>
            {props.children}
        </div> 
    );
} 

/**
 * The function will sign out the user
 *
 * @name Logout 
 */
async function signOut() {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
       
    const meta = new Map(); 
    //set the content type
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    //set new header in order to add the credentials and type
    let headers = new Headers(meta);   
    
    try{
        const settings = { method: 'get', withCredentials: true, credentials: 'include', headers: headers };
        
        //using node fetch to post the data to the API endpoint
        await fetch('https://program-nissan-3000.codio-box.uk/api/user/logout', settings)
            .then(res => {  
            console.log(res)
                //return true if everything is fine     
                if(res.status === 200) {
                    console.log("Success");
                    return res;
                } else {
                    //if the user does not exist 
                    //or
                    //wrong credentials
                    throw new Error("Fail.");                 
                }    
            });
    } catch(err) {
        console.log(err)
        alert("An error has occured while signOut!");
        throw new Error("An error has occured while signOut!");
    }
}

export default withRouter(NavbarL);
