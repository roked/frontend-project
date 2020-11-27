/**
 * @module Components/edit-property
 * @description Edit property page functional component
 * @author Mitko Donchev
 */
import React, {
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import fetch from 'node-fetch';
import base64 from 'base-64';

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
 * The function will get the mata for the headers.
 *
 * @name Get meta
 * @returns {Map} meta - a map of key values
 */
function setMetaForHeaders() {
  // get the username and password from env variables
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

  const meta = new Map();
  // set the content type
  meta.set('Content-Type', 'application/json');
  // auth credentials to access the backend API
  meta.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
  // set new header in order to add the credentials and type
  return meta;
}

/**
 * The function will fetch a specific property from the RESTApi
 *
 * @name Get a property
 * @param {Number} id - the id of the property
 * @returns {Object} the property saved under the provided ID
 */
async function getProperty(id) {
  // get the mata and set the headers
  const meta = setMetaForHeaders();
  const headers = new Headers(meta);

  // all available features
  const allFeatures = ['Beautiful garden', 'Barbeque', 'Pool', 'Balcony', 'Gym'];
  try {
    const settings = {
      method: 'Get', withCredentials: true, credentials: 'include', headers,
    };
    // using node fetch to get the data from the API
    const result = await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}/edit`, settings)
      .then((response) => response.json().then((data) => ({
        property: data.property,
        message: data.message,
        status: response.status,
      })).then((res) => res));

    if (result.status === 200) {
      const features = [];
      // check which feature is true
      // add it to an array
      for (let i = 0; i < allFeatures.length; i += 1) {
        if (result.property.features[i]) {
          features.push(allFeatures[i]);
        }
      }
      // set the features
      result.property.features = features;
    }

    // return the response
    return result;
  } catch (err) {
    return false;
  }
}

/**
 * The function will update an existing property
 *
 * @name Update property
 * @param {Number} id - the id of the property
 * @param {Buffer} images - the image of the property
 * @param {Object} property - the property info
 */
async function updateProperty(id, images, property) {
  // get the mata and set the headers
  const meta = setMetaForHeaders();
  const headers = new Headers(meta);
  let data;
  // if the image is a string (no new image selected)
  if (typeof (images) !== 'string') {
    // create new form data which will be sent to the backend
    data = new FormData();
    if (images) {
      for (let i = 0; i < images.length; i += 1) {
        data.append('file', images[i]);
      }
    }
    // place each value from the property object as part of the formData
    Object.keys(property).forEach((key) => data.append(key, property[key]));
  } else {
    // set the image value
    property.image = images;
    // turn the object to json
    data = JSON.stringify(property);
  }
  try {
    const settings = {
      method: 'put', body: data, withCredentials: true, credentials: 'include', headers,
    };
    // using node fetch to post the data to the API endpoint
    return await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
      .then((response) => response.json().then((item) => ({
        message: item.message,
        status: response.status,
      })).then((res) => res));
  } catch (err) {
    return false;
  }
}

/**
 * Define the edit property functional component
 *
 * @name Edit property page
 * @param {Object} props
 * @returns {DOMRect} the jsx code which represents the edit property page
 */
const EditProperty = (props) => {
  // get the user from the props state
  const user = getUser(props);
  // using react hook function useState to control the state
  const [data, setData] = useState([]);
  // get the property id from the params using react hook
  const { id } = useParams();

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
  const [garden, setGarden] = useState(false);
  const [balcony, setBalc] = useState(false);
  const [pool, setPool] = useState(false);
  const [barbeque, setBarb] = useState(false);
  const [gym, setGym] = useState(false);
  // store the alert
  const [alert, setAlert] = useState();

  // useEffect is called immediately after the component is mounted to the DOM
  useEffect(() => {
    let alertMessage;

    async function fetchData() {
      // send HTTP request
      const result = await getProperty(id);
      if (result.status === 200) {
        // save response to variable
        setData(result.property);
      } else {
        alertMessage = (
          <Alert variant="warning">
            <Alert.Heading>{result.message}</Alert.Heading>
          </Alert>
        );
        setAlert(alertMessage);
      }
    }

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

    // call the function
    fetchData();

    // if no new image
    if (data.image && (!images || images.length === 0)) {
      setImages(data.image[0]);
    }
  }, [id, garden, balcony, pool, barbeque, gym, images]);

  // handleSubmit is called whenever the delete button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    // store the property info in a object
    const updatedData = {
      name: title,
      price,
      category,
      location,
      status,
      features,
      description,
    };

    // if no new image
    //     if (!images || images.length === 0) {
    //       images = data.image[0];
    //     }

    Object.keys(updatedData).forEach((key) => {
      if (key === 'features') {
        updatedData[key] = features;
      } else if (updatedData[key] === '') {
        // if the input field is not changed
        updatedData[key] = data[key]; // attach the old data
      }
    });

    // send the property to the backend
    async function postData() {
      let alertMessage;
      try {
        // send HTTP request
        const result = await updateProperty(id, images, data);
        if (result.status === 200) {
          // redirect to home page
          props.history.push({
            pathname: '/',
            state: { user },
          });
        } else {
          alertMessage = (
            <Alert variant="warning">
              <Alert.Heading>{result.message}</Alert.Heading>
            </Alert>
          );
          setAlert(alertMessage);
        }
      } catch (err) {
        return false;
      }
      return false;
    }
    // call postData
    postData();
  };

  return (
    <div className="container">
      {alert}
      <h1 className="pageTitle">Something new? Just click &apos;Update&apos; when you are ready!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="validationTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              defaultValue={data.name}
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
              defaultValue={data.price}
              onChange={(e) => setPrice(e.target.value)}
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
            <Form.Control
              name="category"
              as="select"
              defaultValue={data.category}
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
              defaultValue={data.location}
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
              defaultValue={data.status}
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
                onChange={(e) => setGarden(e.target.checked)}
              />
              <Form.Check name="barbeque" label="Barbeque" onChange={(e) => setBalc(e.target.checked)} />
              <Form.Check name="pool" label="Pool" onChange={(e) => setPool(e.target.checked)} />
              <Form.Check name="balcony" label="Balcony" onChange={(e) => setBarb(e.target.checked)} />
              <Form.Check name="gym" label="Gym" onChange={(e) => setGym(e.target.checked)} />
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="9" controlId="validationDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={data.description}
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
        <Button className="round" type="submit" variant="success">Update!</Button>
      </Form>
    </div>
  );
};

export default withRouter(EditProperty);
