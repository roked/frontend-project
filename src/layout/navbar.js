import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import fetch from 'node-fetch';
import base64 from 'base-64';
import {withRouter} from "react-router";

//define the default layout function component
//the child components go inside using props.children
const NavbarL = (props) => {
    //initialize timeLeft
    const [timeLeft, setTimeLeft] = useState(6);
    //get the user from the props state
    let user;
    //set the available buttons
    let userButtons;
    if (props.location.state) {
        user = props.location.state.user;
    } else {
        user = false;
    }
    //check for user (if logged in)
    const [isLoggedIn, setUser] = useState(!!user);
    //useRef to keep track of initialMount
    const isInitialMount = useRef(true);
    //store the alert    
    const [alert, setAlert] = useState();
    //store the alert
    let alertMessage;

    //this function runs when the user click sign out
    const handleSignOut = (e) => {
        e.preventDefault();

        //send the user object
        async function singOutUser() {
            try {
                //send HTTP request
                const result = await signOut();
                if (result.status === 200) {
                    alertMessage =
                        <Alert variant="success">
                            <Alert.Heading>{result.message}</Alert.Heading>
                        </Alert>
                    setAlert(alertMessage);
                    setUser(false)
                    //redirect to home page
                    //pass the loged user
                    props.history.push({
                        pathname: '/login',
                        state: {user: false}
                    });
                } else {
                    alertMessage =
                        <Alert variant="danger">
                            <Alert.Heading>{result.message}</Alert.Heading>
                        </Alert>
                    setAlert(alertMessage);
                }
            } catch (err) {
                console.log(err);
            }
        }

        //call postData
        singOutUser();
    }

    //useEffect will run only on updates except initial mount
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setUser(user);
        }

        // exit early when we reach 0
        if (!timeLeft) {
            //remove alert
            setAlert();
            //reset the timer
            setTimeLeft(6);
        }

        //using setInterval to run every second
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);

    }, [user, timeLeft]);

    //go back to home
    const goHome = () => {
        try {
            setAlert();
            //redirect to homepage
            props.history.push({
                pathname: '/',
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };

    //go back to about page
    const goAbout = () => {
        try {
            setAlert();
            //redirect to about
            props.history.push({
                pathname: '/about',
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };

    //go back to about page
    const goProfile = () => {
        try {
            setAlert();
            //redirect to about
            props.history.push({
                pathname: '/profile',
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };

    //login page
    const loginPage = () => {
        try {
            setAlert();
            //redirect to about
            props.history.push({
                pathname: '/login',
            });
        } catch (err) {
            console.log(err);
        }
    };

    //register page
    const registerPage = () => {
        try {
            setAlert();
            //redirect to about
            props.history.push({
                pathname: '/register',
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoggedIn) {
        userButtons = <Nav className="ml-auto">
            <Nav.Link onClick={() => goProfile()}>Profile</Nav.Link>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        </Nav>
    } else {
        userButtons = <Nav className="ml-auto">
            <Nav.Link onClick={() => registerPage()}>Sign Up</Nav.Link>
            <Nav.Link onClick={() => loginPage()}>Sign In</Nav.Link>
        </Nav>
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#">Real Estate Listing</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => goHome()}>Home</Nav.Link>
                        <Nav.Link onClick={() => goAbout()}>About</Nav.Link>
                    </Nav>
                    {userButtons}
                </Navbar.Collapse>
            </Navbar>
            {props.children}
            {alert}
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

    try {
        const settings = {method: 'get', withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to post the data to the API endpoint
        return await fetch('https://program-nissan-3000.codio-box.uk/api/user/logout', settings)
            .then(response =>
                response.json().then(data => ({
                        message: data.message,
                        status: response.status
                    })
                ).then(res => res));
    } catch (err) {
        console.log(err);
    }
}

export default withRouter(NavbarL);
