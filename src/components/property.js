import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form';
import {useParams} from "react-router-dom";
import fetch from 'node-fetch';
import base64 from 'base-64';
import {withRouter} from "react-router";

//keep the image for archive
let archiveImage;

//define the property page function component
//add card which will hold the information
const Property = (props) => {
    //get the user from the props state
    let user;
    if (props.location.state) {
        user = props.location.state.user;
    } else {
        user = false;
    }

    //using react hook function useState 
    //to keep the state of the data
    const [data, setData] = useState([]);
    //keep the state of the msg
    const [msg, setMsg] = useState("");
    //list of features will be stored here
    let listFeatures;

    //get the property id from the params using react hook
    const {id} = useParams();

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
    if (data.features) {
        listFeatures = data.features.map((feature) =>
            <ListGroupItem>{feature}</ListGroupItem>
        );
    }

    //handleSubmit is called whenever the delete button is clicked
    const handleClick = (e) => {
        e.preventDefault();
        //delete the property using the api
        async function deleteData(id) {
            try {
                //delete the property
                await deleteProperty(id);
                //redirect to home page
                props.history.push({
                    pathname: '/',
                    state: {user: user}
                });
            } catch (err) {
                console.log(err);
            }
        }
        //call deleteData
        deleteData(id);
    }

    //editProperty is called whenever edit button is clicked
    const editProperty = (propertyId) => {
        try {
            //redirect to property
            props.history.push({
                pathname: '/property/' + propertyId.id + '/edit',
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };
    
    //editProperty is called whenever edit button is clicked
    const archieveProperty = (propertyId) => {
        //store the default image format
        data.image = [archiveImage];
        data.status = "Unpublished";
        async function updateStatus(id, data) {
            console.log(data)
            try {
                await updateProperty(id, data);
                //redirect to home
                props.history.push({
                    pathname: '/',
                    state: {user: user}
                });
            } catch (err) {
                console.log(err);
            }
        }
        
        updateStatus(propertyId.id, data);
    };

    //handleSubmit is called whenever user sends messages
    const handleSubmit = (e) => {
        e.preventDefault();
        //get the owner of the property       
        const receiver = data.author.username;

        //send a message
        async function sendMsg(msg, receiver) {
            //create an object to store information
            const msgToSend = {
                receiver: receiver,
                msg: msg
            }
            //HTTP request 
            const respond = await sendMessage(msgToSend);
            if (respond) {
                window.location.reload(false);
            }
        }

        sendMsg(msg, receiver);
    };

    //available buttons
    //depends of the user (property owner or not)
    let buttons;
    //h1 text
    let h1Text;
    if (data.author && user) {
        if (data.author.id === user._id) {
            if(data.status === "Unpublished") {
                h1Text = <h1 className="pageTitle">Hey {user.username}! How are you today?</h1>
                buttons = <div>
                        <Button className="mx-1" onClick={() => editProperty({id})} variant="warning">Edit Property</Button>
                        <Button className="mx-1" variant="danger" onClick={handleClick}>Delete</Button>
                    </div>
            } else {
                h1Text = <h1 className="pageTitle">Hey {user.username}! How are you today?</h1>
                buttons = <div>
                    <Button className="mx-1" onClick={() => archieveProperty({id})} variant="secondary">Archive</Button>
                    <Button className="mx-1" onClick={() => editProperty({id})} variant="warning">Edit Property</Button>
                    <Button className="mx-1" variant="danger" onClick={handleClick}>Delete</Button>
                </div>
            }
        } else {
            h1Text = <h1 className="pageTitle">We hope you like it!</h1>
            buttons = <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="info" eventKey="1">
                            Contact Seller
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                name="msg"
                                onChange={e => setMsg(e.target.value)}
                                required
                                type="text"
                                as="textarea"
                                rows="3"
                                placeholder="You have a nice..."
                            />
                            <Button type="submit" variant="success">Send</Button>
                        </Form>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        }
    } else {
        h1Text = <h1 className="pageTitle">We hope you like it!</h1>
        buttons = <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="info" eventKey="1">
                        Contact Seller
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            name="msg"
                            onChange={e => setMsg(e.target.value)}
                            required
                            type="text"
                            as="textarea"
                            rows="3"
                            placeholder="You have a nice..."
                        />
                        <Button type="submit" variant="success">Send</Button>
                    </Form>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    }

    return (
        <div className="container">
            {h1Text}
            <Card className="singleCard">
                <Card.Img variant="top" src={data.image}/>
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
                    {buttons}
                </Card.Footer>
            </Card>
        </div>
    );
}

/**
 * The function will fetch a specific property from the RESTApi
 *
 * @name Get a proeprty
 * @param {Number} id - the id of the property
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

    try {
        const settings = {method: 'Get', withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to get the data from the API
        const getData = await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
            .then(res => res.json())
            .then((json) => json);
        //if image exists
        if (getData.image) {
            //store the image
            archiveImage = getData.image[0].filename;
            //prepare the image for read as base64 string
            getData.image = ("data:image/png;base64," + getData.image[0].img);
        }
        //current features 
        let features = []
        //check which feature is true
        //add it to an array
        for (let i = 0; i < allFeatures.length; i++) {
            if (getData.features[i]) {
                features.push(allFeatures[i]);
            }
        }
        //set the faetures
        getData.features = features;
        //return the data fetched from the API endpoint
        return getData;
    } catch (err) {
        alert("An error has occurred while getData!");
        throw new Error("An error has occurred while getData!");
    }
}

/**
 * The function will delete a specific property using an api endpoint
 *
 * @name Delete a property
 * @param {Number} id - the id of the property
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

    try {
        const settings = {method: 'delete', withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to delete the selected property
        //return the response
        return await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
            .then(res => res.json())
            .then((json) => json);
    } catch (err) {
        alert("An error has occurred while delete!");
        throw new Error("An error has occurred while delete!");
    }
}

/**
 * The function will send a message to a user
 *
 * @name Send a message
 * @param {Object} msg - the message
 * @returns {Boolean} true if everything is okay
 */
async function sendMessage(msg) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;

    const meta = new Map();
    //set the content type
    meta.set('Content-Type', 'application/json');
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    //set new header in order to add the credentials and type
    let headers = new Headers(meta);

    try {
        const settings = {
            method: 'post',
            body: JSON.stringify(msg),
            withCredentials: true,
            credentials: 'include',
            headers: headers
        };

        //using node fetch to send a message
        await fetch('https://program-nissan-3000.codio-box.uk/api/message/new', settings)
            .then(res => {
                //return true if everything is fine     
                if (res.status === 200) {
                    //get a json promise from the respond
                    return res.json();
                } else {
                    //if message not send
                    throw new Error("Fail.");
                }
            });
        return true;
    } catch (err) {
        alert("An error has occurred while sending message!");
        throw new Error("An error has occurred while sending message!");
    }
}

/**
 * The function will archive an existing property
 *
 * @name Archive property
 * @param {Number} id - the id of the property
 * @param {Object} proeprty - the property info
 */
async function updateProperty(id ,property) {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    let data;
    const meta = new Map();     
    
    //turn the object to json
    data = JSON.stringify(property);
    //set the content type
    meta.set('Content-Type', 'application/json');       
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));   
    //set new header in order to add the credentials and type
    let headers = new Headers(meta);   
    
    try{
        const settings = { method: 'put', body: data, withCredentials: true, credentials: 'include', headers: headers };

        //using node fetch to post the data to the API endpoint
        await fetch(`https://program-nissan-3000.codio-box.uk/api/property/show/${id}`, settings)
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
    } catch(err) {
        alert("An error has occured while updateProperty!");
        throw new Error("An error has occured while updateProperty!");
    }
}

export default withRouter(Property);
