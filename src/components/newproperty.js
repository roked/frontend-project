import React, { 
    useState,
    useEffect
}             from 'react';
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';
import fetch  from 'node-fetch';
import base64 from 'base-64';

//define the new proprty page function component
const NewProperty = () => {
    const [validated, setValidated] = useState(false);
    
    //set variables which state will be checked 
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [images, setImages] = useState();
    const [features, setFeatures] = useState([]);
    const [description, setDescription] = useState([""]);
    
    //set features variables which state will be checked  
    const [garden, setGarden] = useState();
    const [balcony, setBalc] = useState();
    const [pool, setPool] = useState();
    const [barbeque, setBarb] = useState();
    const [gym, setGym] = useState();    
    
    //handleSubmit hook is called whenever the form is submited
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }       
        
      //store the property info in a object
      const data = {
          name: title,
          price: price,
          category: category,
          location: location,
          status: status,
          features: features,
          description: description
      }  
      
      //send the property to the backend
      async function postData(images, data) {
          // send HTTP request
          const response = await createProperty(images, data);
          console.log(response)
      }   
        
      //call the function
      postData(images, data);    
        
      setValidated(true);
    };   
    
    //lifecycle method
    //useEffect is called immediately after the component is mounted to the DOM
    //it will be called each time one of the faetures state chenges
    useEffect(() => {             
       //store all features in an object    
       const feat = {
         garden: garden,
         balcony: balcony,
         pool: pool,
         barbeque: barbeque,
         gym: gym
       } 
       //set the features (object.value() return an array)               
       setFeatures(Object.values(feat));
    }, [garden, balcony, pool, barbeque, gym]);
    
    return(
        <div className="container">
            <h1 className="pageTitle">Let's gather some information. Please complete the form!</h1>            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
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
                        onChange={e => setPrice(e.target.value)}
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
                      <Form.Control name="category" 
                          as="select"                          
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          custom 
                          required
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
                          onChange={e => setLocation(e.target.value)}
                          type="text" 
                          placeholder="Postcode" 
                          required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid postcode.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="exampleForm.SelectStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control name="status" 
                          as="select"                          
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          custom 
                          required
                          >
                        <option>--Please Select--</option>
                        <option>New</option>
                        <option>High Priority</option>
                        <option>Unpublish</option>
                      </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFile">
                      <Form.Label>Attach Images</Form.Label>
                      <Form.File 
                          id="files-input"
                          name="images"
                          defaultValue={images}
                          onChange={e => setImages(e.target.files)}
                          multiple
                       />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} md="9" controlId="validationCheck">
                          <Form.Label>Features</Form.Label>
                          <div className="checkBox">
                              <Form.Check name="garden" label="Beautiful garden" value={garden} onChange={e => setGarden(e.target.checked)}/>
                              <Form.Check name="barbeque" label="Barbeque" value={barbeque} onChange={e => setBalc(e.target.checked)}/>
                              <Form.Check name="pool" label="Pool" value={pool} onChange={e => setPool(e.target.checked)}/>
                              <Form.Check name="balcony" label="Balcony" value={balcony} onChange={e => setBarb(e.target.checked)}/>
                              <Form.Check name="gym" label="Gym" value={gym} onChange={e => setGym(e.target.checked)}/>                                                          
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
                         onChange={e => setDescription(e.target.value)}
                         type="texta" 
                         placeholder="This property has..." 
                         required />
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

/**
 * The function will send the new property to the RESTApi
 *
 * @name Create new property
 * @param {Object} property - the property info
 * @returns {Boolean} true - if everything is fine
 */
async function createProperty(images, property) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
    console.log(images)
    
    //create new form data which will be sent to the backend
    const data = new FormData();
    for(let i=0; i<images.length; i++) {
       data.append('file', images[i])
    }
    
    //place each value from the property object as part of the formData
    Object.keys(property).forEach(key => data.append(key, property[key]));
    
    //set new header in order to add the credentials
    let headers = new Headers();  
    
    //auth credentials to access the backend API
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password), 'Accept', 'application/json');
//     //set the content type to form-data
//     headers.append('Content-Type', 'multipart/form-data');
    
    try{
        const settings = { method: 'post', body: data, withCredentials: true, credentials: 'include', headers: headers };

        console.log(settings);
        
        //using node fetch to post the data to the API endpoint
        const sendData = await fetch(`https://program-nissan-3000.codio-box.uk/api/property/new`, settings)
            .then(res => res.json())
            .then(json => console.log(json));
        
        //return true if everything is fine
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export default NewProperty;
