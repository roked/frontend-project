import React, {useState}  from 'react';
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';

//define the new proprty page function component
//TODO - https://www.npmjs.com/package/bs-custom-file-input - makes Bootstrap 4 custom file input dynamic with no dependencies.
const NewProperty = () => {
    const [validated, setValidated] = useState(false);

    //this function checks the input validity on submit
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
            <h1 className="pageTitle">Let's gather some information. Please complete the form!</h1>            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        required
                        type="text"
                        placeholder="My Property"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid title.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        name="price"
                        required
                        type="text"
                        placeholder="£30000"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="exampleForm.SelectCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control name="category" as="select" custom required>
                        <option>Commercial</option>
                        <option>Terrace</option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Castle</option>
                      </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control name="location" type="text" placeholder="Postcode" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid postcode.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationSatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control name="status" as="select" custom required>
                        <option>New</option>
                        <option>High Priority</option>
                        <option>Unpublish</option>
                      </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFile">
                      <Form.Label>Attach Images</Form.Label>
                      <Form.File 
                          id="file-input"
                          label="Images"
                          name="file"
                          multiple
                          custom
                       />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} md="9" controlId="validationCheck">
                          <Form.Label>Features</Form.Label>
                          <div className="checkBox">
                              <Form.Check name="garden" label="Beautiful garden"/>
                              <Form.Check name="barbeque" label="Barbeque"/>
                              <Form.Check name="pool" label="Pool"/>
                              <Form.Check name="balcony" label="Balcony"/>
                              <Form.Check name="gym" label="Gym"/>                                                          
                          </div>
                      </Form.Group>
                 </Form.Row>                              
                 <Form.Row>
                     <Form.Group as={Col} md="9" controlId="validationDescription">
                     <Form.Label>Description</Form.Label>
                     <Form.Control as="textarea" name="description" type="texta" placeholder="This property has..." required />
                     <Form.Control.Feedback type="invalid">
                       Please provide a valid description.
                     </Form.Control.Feedback>
                   </Form.Group>
                 </Form.Row>
                 <Form.Group>
                   <Form.Check
                     required
                     label="Agree to terms and conditions"
                     feedback="You must agree before submitting."
                   />
                 </Form.Group>
                 <Button className="round" type="submit" variant="success">Publish property!</Button>
             </Form>
        </div>
    );
}

export default NewProperty;
