import React, {useState}  from 'react';
import Form               from 'react-bootstrap/Form';
import Button             from 'react-bootstrap/Button';
import fetch              from 'node-fetch';
import base64             from 'base-64';
import { withRouter }     from "react-router";

//define the login page function component
//TODO - add password check
const Register = (props) => {
    //set variables which state will be checked 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpCode, setCode] = useState("");
    
    //this function checks the input validity on submit
    const handleSubmit = (e) => {        
        e.preventDefault();      
        //create user object
        const user = {
            username: username,
            email: email,
            password: password,
            signUpCode: signUpCode
        }
        
        //send the user object
        async function postUser(user) {
            try{
                //send HTTP request
                await createProperty(user);   
                //redirect to home page
                props.history.push('/login');
            } catch (err) {
                console.log(err);
            }
        }   
        
        //call postData
        postUser(user);      
       
    };
    
    return(
        <div className="container">
            <h1 className="pageTitle">First time here? You're have one more step!</h1>
            <Form onSubmit={handleSubmit}>
               <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter Username" 
                    required
                    />
                <Form.Text className="text-muted">
                  Choose a cool username. You will thank us later.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email" 
                    required
                    />
                <Form.Text className="text-muted">
                  We'll never share your email and password with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password" 
                    minLength="8" maxLength="20" 
                    required/>
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters and numbers, and
                  must not contain spaces, special characters, or emoji.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please choose a valid password.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicSignUpCode">
                <Form.Label>Sign-up Code</Form.Label>
                <Form.Control 
                    type="text" 
                    name="signUpCode"                    
                    value={signUpCode}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Sign-up code"
                    minLength="5" 
                    required
                    />
                <Form.Text id="passwordHelpBlock" muted>
                  Please provide your sign-up code.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid sign-up code.
                </Form.Control.Feedback>
              </Form.Group>

               <Form.Group>
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                />
              </Form.Group>

              <Button className="round" variant="primary" type="submit">
                Sign Up!
              </Button>
            </Form>
        </div>
    );
}

/**
 * The function will try to register a new user
 *
 * @name Registration
 * @param {Object} user - the user info
 * @returns {Boolean} true - if everything is fine
 */
async function createProperty(user) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
       
    const meta = new Map(); 
    //set the content type
    meta.set('Content-Type', 'application/json');
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    //set new header in order to add the credentials and type
    let headers = new Headers(meta);   
    
    try{
        const settings = { method: 'post', body: JSON.stringify(user), withCredentials: true, credentials: 'include', headers: headers };

        console.log(settings);
        
        //using node fetch to post the data to the API endpoint
        await fetch('https://program-nissan-3000.codio-box.uk/api/user/register', settings)
            .then(res => res.json())
            .then(json => console.log(json));
        
        //return true if everything is fine
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export default withRouter(Register);
