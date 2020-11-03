import React, { 
    useState, 
    useEffect 
}                    from 'react';
import Card          from 'react-bootstrap/Card';
import Button        from 'react-bootstrap/Button';
import ListGroup     from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { useParams } from "react-router-dom";
import fetch         from 'node-fetch';
import base64        from 'base-64';

//define the property page function component
//add card which will hold the information
const Property = (props) => {
    //using react hook function useState to controll the state
    const [data, setData] = useState([]);
    
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
    
                console.log(typeof(data))
    
    return(
        <div className="container">
            <h1 className="pageTitle">We hope you like it!</h1>
                <Card>
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
                                <ListGroupItem>* Default</ListGroupItem>
                        </ListGroup>
                    </ListGroupItem>
                    <ListGroupItem>Location: {data.location}</ListGroupItem>
                    </ListGroup>    
                  <Card.Footer>
                    <big className="text-muted">Price: {data.price}</big>
                    <Button href="/property/edit/" variant="warning">Edit Property</Button>
                    <Button variant="info">Contact Seller</Button>
                  </Card.Footer>
                </Card>
        </div>
    );
}

/**
 * The function will fetch all properties from the RESTApi
 *
 * @name Get the all properties
 * @param {Integer} id - the id of the property
 * @returns {Object} all properties saved in the DB
 */
async function getProperty(id) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
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

        //return the data fetched from the API endpoint
        return getData;
    } catch(err) {
        console.log(err);
    }
}

export default Property;
