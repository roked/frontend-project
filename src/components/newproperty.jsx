/**
 * @module Components/new-property
 * @description New property page functional component
 * @author Mitko Donchev
 */
import React, {
  useState,
  useEffect,
} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import fetch from 'node-fetch';
import base64 from 'base-64';
import { withRouter } from 'react-router';

/**
 * The function will get the current user if one.
 *
 * @name Get user
 * @param {Object} props - the react props
 * @returns {Object} the current user info
 * @returns {Boolean} false - if no user
 */
function getUser(props) {
  let user;
  if (props.location.state) {
    user = props.location.state.user;
  } else {
    user = false;
  }
  return user;
}

/**
 * The function will send the new property to the RESTApi
 *
 * @name Create new property
 * @param {Buffer} images - the image of the property
 * @param {Buffer} property - the property info
 * @returns {Object} the response data
 */
async function createProperty(images, property) {
  // get the username and password from env variables
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;
  // create new form data which will be sent to the backend
  const data = new FormData();
  if (images) {
    for (let i = 0; i < images.length; i += 1) {
      data.append('file', images[i]);
    }
  }
  // place each value from the property object as part of the formData
  Object.keys(property).forEach((key) => data.append(key, property[key]));
  // set new header in order to add the credentials
  const headers = new Headers();
  // auth credentials to access the backend API
  headers.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`, 'Accept', 'application/json');
  try {
    const settings = {
      method: 'post', body: data, withCredentials: true, credentials: 'include', headers,
    };
    // using node fetch to post the data to the API endpoint
    return await fetch('https://full-stack-project-md.herokuapp.com/api/property/new', settings)
      .then((response) => response.json().then((item) => ({
        message: item.message,
        status: response.status,
      })).then((res) => res));
  } catch (err) {
    return false;
  }
}

/**
 * Define the new property page functional component
 *
 * @name New property page
 * @param {Object} props
 * @returns {DOMRect} the jsx code which represents the new property page
 */
const NewProperty = (props) => {
  // get the user from the props state
  const user = getUser(props);
  // set variables which state will be checked
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState();
  const [features, setFeatures] = useState();
  const [description, setDescription] = useState('');

  // set features variables which state will be checked
  const [garden, setGarden] = useState();
  const [balcony, setBalc] = useState();
  const [pool, setPool] = useState();
  const [barbeque, setBarb] = useState();
  const [gym, setGym] = useState();
  // store the alert
  const [alert, setAlert] = useState();

  // handleSubmit is called whenever the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // store the property info in a object
    const data = {
      name: title,
      price,
      category,
      location,
      status,
      features,
      description,
    };

    // send the property to the backend
    async function postData() {
      let alertMessage;
      try {
        // send HTTP request
        const result = await createProperty(images, data);
        if (result.status === 200) {
          // redirect to home page
          props.history.push({
            pathname: '/',
            state: { user },
          });
          return true;
        }
        alertMessage = (
                        <Alert variant="warning">
                            <Alert.Heading>{result.message}</Alert.Heading>
                        </Alert>
        );
        setAlert(alertMessage);
        return false;
      } catch (err) {
        return false;
      }
    }

    // call postData
    postData();
  };

  // lifecycle method
  // useEffect is called immediately after the component is mounted to the DOM
  // it will be called each time one of the features state changes
  useEffect(() => {
    // store all features in an object
    const feat = {
      garden,
      balcony,
      pool,
      barbeque,
      gym,
    };
    // set the features (object.value() return an array)
    setFeatures(Object.values(feat));
  }, [garden, balcony, pool, barbeque, gym]);

  return (
        <div className="container">
            {alert}
            <h1 className="pageTitle">Let&apos;s gather some information. Please complete the form!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
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
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          type="text"
                          placeholder="??30000"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid price.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="exampleForm.SelectCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          name="category"
                          as="select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          custom
                          required
                          data-testid="select-one"
                        >
                            <option>--Please Select--</option>
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
                        <Form.Control
                          name="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          type="text"
                          placeholder="Postcode"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid postcode.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="exampleForm.SelectStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          name="status"
                          as="select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          custom
                          required
                          data-testid="select-multiple"
                        >
                            <option>--Please Select--</option>
                            <option>New</option>
                            <option>High Priority</option>
                            <option>Unpublished</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFile">
                        <Form.Label>Attach Images</Form.Label>
                        <Form.File
                          data-testid="files-input"
                          name="images"
                          defaultValue={images}
                          onChange={(e) => setImages(e.target.files)}
                          multiple
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="9" controlId="validationCheck">
                        <Form.Label>Features</Form.Label>
                        <div className="checkBox">
                            <Form.Check
                              name="garden"
                              label="Beautiful garden"
                              value={garden}
                              onChange={(e) => setGarden(e.target.checked)}
                            />
                            <Form.Check
                              name="barbeque"
                              label="Barbeque"
                              value={barbeque}
                              onChange={(e) => setBalc(e.target.checked)}
                            />
                            <Form.Check
                              name="pool"
                              label="Pool"
                              value={pool}
                              onChange={(e) => setPool(e.target.checked)}
                            />
                            <Form.Check
                              name="balcony"
                              label="Balcony"
                              value={balcony}
                              onChange={(e) => setBarb(e.target.checked)}
                            />
                            <Form.Check name="gym" label="Gym" value={gym} onChange={(e) => setGym(e.target.checked)} />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="9" controlId="validationDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="textarea"
                          placeholder="This property has..."
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid description.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button className="round" type="submit" variant="success">Publish property!</Button>
            </Form>
        </div>
  );
};

export default withRouter(NewProperty);
