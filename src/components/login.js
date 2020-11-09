import React, {useState}  from 'react';
import Form               from 'react-bootstrap/Form';
import Button             from 'react-bootstrap/Button';
import fetch              from 'node-fetch';
import base64             from 'base-64';
import { withRouter }     from 'react-router';

//define the login page function component
const Login = (props) => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();       
        //create user object
        const userData = {
            email: email,
            password: password
        }      
        //send the user object
        async function postUser(userData) {
            try{
                //send HTTP request
                const userInfo = await signIn(userData);                 
                
                //redirect to home page
                //pass the loged user
                props.history.push({
                  pathname: '/',                  
                  state: { user: userInfo }
                });
            } catch (err) {
                console.log(err);
            }
        }         
        //call postData
        postUser(userData);       
    };
    
    return(
        <div className="container">
            <h1 className="pageTitle">Nice to meet you seller. Let's get started!</h1>
            <Form onSubmit={handleSubmit}>
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
                  Email empty or wrong!
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
                    required
                    />
                <Form.Text className="text-muted">
                  Never share your password with anyone else!
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Password empty or invalid!
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="round" variant="primary" type="submit">
                Sign In!
              </Button>
            </Form>
        </div>
    );
}

/**
 * The function will allow user to sign in with valid credentials
 *
 * @name Login
 * @param {Object} user - the user info
 * @returns {Object} user - user is authenticated
 */
async function signIn(user) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
       
    const meta = new Map(); 
    //set the content type
    meta.set('Content-Type', 'application/json');
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    //allow json data
    meta.set('Accept', 'application/json');

    //set new header in order to add the credentials and type
    let headers = new Headers(meta);   
    
    try{
        const settings = { method: 'post', body: JSON.stringify(user), withCredentials: true, credentials: 'include', headers: headers };
        
        //using node fetch to post the data to the API endpoint
        const data = await fetch('https://program-nissan-3000.codio-box.uk/api/user/login', settings)
            .then(res => {                
                //return true if everything is fine     
                if(res.status === 200) {
                    //get a json promise from the respond
                    return res.json();
                } else {
                    //if the user does not exist 
                    //or
                    //wrong credentials
                    throw new Error("Fail.");                 
                }    
            }).then(json => json); //get the loged user data
        
        //return user data
        return data;
    } catch(err) {
        console.log(err)
        alert("An error has occured while signIn!");
        throw new Error("An error has occured while signIn!");
    }
}

export default withRouter(Login);
