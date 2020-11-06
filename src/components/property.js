import React, { 
    useState, 
    useEffect 
}                     from 'react';
import Card           from 'react-bootstrap/Card';
import Button         from 'react-bootstrap/Button';
import ListGroup      from 'react-bootstrap/ListGroup';
import ListGroupItem  from 'react-bootstrap/ListGroupItem';
import { useParams }  from "react-router-dom";
import fetch          from 'node-fetch';
import base64         from 'base-64';
import { withRouter } from "react-router";

//define the property page function component
//add card which will hold the information
const Property = (props) => {
    //using react hook function useState to controll the state
    const [data, setData] = useState([]);
    //list of features will be stored here
    let listFeatures;
    
    //get the property id from the params using react hook
    const { id } = useParams();
    
    //lifecycle method
    //useEffect is called immediately after the component is mounted to the DOM
    useEffect(() => {
        async function fetchData() {
            // send HTTP request
            const result = await getProperty(id);
            // save response to variable
            setData(result);
        }   
                
        //call the function
        fetchData();    
    }, [id]);    
    
    //get each property from the data
    //and create a list
    if(data.features){
        listFeatures = data.features.map((feature) =>
            <ListGroupItem>{feature}</ListGroupItem>
        );
    }   
    
    //handleSubmit hook is called whenever the delete button is clicked
    const handleClick = (e) => {
        e.preventDefault();
        
        //delete the property using the api
        async function deleteData(id) {
            try{
                //delete the property
                await deleteProperty(id);  
                //redirect to home page
                props.history.push('/');
            } catch (err) {
                console.log(err);
            }
        }   
        
        //call deleteData
        deleteData(id);                
    }
    
    return(
        <div className="container">
            <h1 className="pageTitle">We hope you like it!</h1>
                <Card className="singleCard">
                  <Card.Img variant="top" src={data.image} />
                  <Card.Body>
                    <Card.Title id="cardTitle">{data.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Status: {data.status}</ListGroupItem>
                    <ListGroupItem>Category: {data.category}</ListGroupItem>
                    <ListGroupItem>Description: {data.description}</ListGroupItem>
                    <ListGroupItem>Features: 
                        <ListGroup className="list-group-flush">
                            {listFeatures}
                        </ListGroup>
                    </ListGroupItem>
                    <ListGroupItem>Location: {data.location}</ListGroupItem>
                    </ListGroup>    
                  <Card.Footer>
                    <big className="text-muted">Price: {data.price}</big>
                    <Button href="/property/edit/" variant="warning">Edit Property</Button>
                    <Button variant="danger" onClick={handleClick}>Delete</Button>
                    <Button variant="info">Contact Seller</Button>
                  </Card.Footer>
                </Card>
        </div>
    );
}

/**
 * The function will fetch a specific property from the RESTApi
 *
 * @name Get a proeprty
 * @param {Integer} id - the id of the property
 * @returns {Object} the property saved under the provided ID
 */
async function getProperty(id) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
    //all available features
    const allFeatures = ['Beautiful garden', 'Barbeque', 'Pool', 'Balcony', 'Gym'];
    
    //set new header in order to add the credentials
    let headers = new Headers();
    
    //auth credentials to access the backend API
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    try{
        const settings = { method: 'Get' , withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to get the data from the API
        const getData = await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
            .then(res => res.json())
            .then((json) => json);
        //if image exists
        if(getData.image) {
            //prepare the image for read as base64 string
            getData.image = ("data:image/png;base64," + getData.image[0].img);
        }                            
        
        //current features 
        let features = []
        
        //check which feature is true
        //add it to an array
        for(let i=0; i<allFeatures.length; i++) {
            if(getData.features[i]){
                features.push(allFeatures[i]);
            }
        }
        
        getData.features = features;

        //return the data fetched from the API endpoint
        return getData;
    } catch(err) {
        console.log(err);
    }
}

/**
 * The function will delete a specific property using an api endpoint
 *
 * @name Delete a proeprty
 * @param {Integer} id - the id of the property
 * @returns {Boolean} true if everything is okay
 */
async function deleteProperty(id) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
    //set new header in order to add the credentials
    let headers = new Headers();
    
    //auth credentials to access the backend API
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    try{
        const settings = { method: 'delete' , withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to delete the selected property
        const getData = await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
            .then(res => res.json())
            .then((json) => json);                           

        //return the response
        return getData;
    } catch(err) {
        console.log(err);
    }
}

export default withRouter(Property);
