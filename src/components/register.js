import React, {useState}  from 'react';
import Form   from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//define the login page component
//TODO - add password check
const Register = () => {
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
            <h1 id="loginTitle">First time here? You're have one more step!</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required/>
                <Form.Text className="text-muted">
                  We'll never share your email and password with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
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
                <Form.Control type="text" placeholder="Sign-up code" required/>
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

              <Button id="round" variant="primary" type="submit">
                Sign Up!
              </Button>
            </Form>
        </div>
    );
}

export default Register;
