import React  from 'react';
import Form   from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//define the login page component
const Login = () => (
    <div className="container">
        <h1 id="loginTitle">Nice to meet you seller. Let's get started!</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required/>
            <Form.Text className="text-muted">
              We'll never share your email and password with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required/>
            <Form.Text className="text-muted">
              Vever share your password with anyone else!
            </Form.Text>
          </Form.Group>
            
          <Button id="round" variant="primary" type="submit">
            Sign In!
          </Button>
        </Form>
    </div>
);

export default Login;
