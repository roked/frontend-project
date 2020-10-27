import React, {useState}  from 'react';
import Form               from 'react-bootstrap/Form';
import Button             from 'react-bootstrap/Button';

//define the login page component
const Login = () => {
    
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
    };
    
    return(
        <div className="container">
            <h1 className="pageTitle">Nice to meet you seller. Let's get started!</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required/>
                <Form.Text className="text-muted">
                  We'll never share your email and password with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Email empty or wrong!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
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

export default Login;
