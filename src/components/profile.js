import React, { 
    useState, 
    useEffect,
    useRef
}                     from 'react';
import { 
    withRouter 
}                     from "react-router";
import Card           from 'react-bootstrap/Card';
import CardDeck       from 'react-bootstrap/CardDeck';
import Button         from 'react-bootstrap/Button';
import ListGroup      from 'react-bootstrap/ListGroup';
import ListGroupItem  from 'react-bootstrap/ListGroupItem'
import fetch          from 'node-fetch';
import base64         from 'base-64';


const Profile = (props) => {   
    let propertiesList; //variable to store the properties
    let messagesList = []; //array to store a list of massages
    //get the user from the props state
    let user;
    if(props.location.state){
        user = props.location.state.user;
    } else {
        user = false;
    }
    
    //store the state of the properties data
    const [data, setData] = useState([]);
    //store the state of the message history data
    const [msgData, setMsgData] = useState([]);
    //truncate the description
    function Truncate(props){
        //the max lenght of a description
        const maxLenght = 100;
        return <Card.Text> {props.name.length > maxLenght ? props.name.substring(0, maxLenght) + "..." : props.name} </Card.Text>;
    }
    
    //lifecycle method
    //useEffect is called immediately after the component is mounted to the DOM
    useEffect(() => {
        async function fetchData(user) {
            //set the user
            const currentUser = {
                user: user
            }
            // send HTTP request
            //get properties
            const result = await getProperties(currentUser);
            //get messages
            const history = await getHisotry();
            //save responses to variables
            setData(result);
            setMsgData(history);
        }          
        
        //call the function
        fetchData(user); 
    }, [user]);    
    
    //visitProperty is called whenever a property is selected
    const visitProperty = (propertyId) => {  
        try{
             //redirect to property
             props.history.push({
                 pathname:'/property/' + propertyId, 
                 state: { user: user }
             });
         } catch (err) {
             console.log(err);
         }   
    };  
    
    //get each property from the data
    //and create a list
    if(data){
        propertiesList = data.map((item) =>
            <ListGroupItem>
                <Card id="cardTitle">
                        <Card.Img variant="left" src={item.image} />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Truncate name={item.description}/>
                        </Card.Body>
                        <Card.Footer>
                          <big className="text-muted">Price: {item.price}</big>
                          <Button onClick={()=> visitProperty(item._id)} variant="info">More Info</Button>
                        </Card.Footer>
                 </Card>                          
            </ListGroupItem>
        );
    } 
    
    //get each message from the data
    //create a list group element 
    //and store it in an array
    if(msgData.length !== 0){
        msgData.map((item) => { messagesList.push(item.msgs.map((value) =>
            <ListGroupItem>
                <Card id="cardTitle">
                        <Card.Body>
                          <Card.Title>Message: {value}</Card.Title>
                          <p>Sender: {item.sender}</p>
                        </Card.Body>
                 </Card>                          
            </ListGroupItem>
        ))});
    } 
    
    return(
        <div className="container">
            <h1 className="pageTitle">Hey {user.username}! Hope you are doing great!</h1>
            <div className="userInfo row">
                <div className="col-6 verticalLine">
                    <ListGroup className="list-group-flush">
                        <h1>Your currently active listing</h1>
                        {propertiesList}
                    </ListGroup>
                </div>
                <div className="col-6">
                    <ListGroup className="list-group-flush">
                        <h1>Your messages</h1>
                        {messagesList}
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

/**
 * The function will fetch all properties from the RESTApi
 *
 * @name Get the all properties
 * @returns {Object} all properties saved in the DB
 */
async function getProperties(currentUser) {
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
    
    try{
        const settings = { method: 'post', body:JSON.stringify(currentUser), withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to get the data from the API
        const getData = await fetch('https://program-nissan-3000.codio-box.uk/api/property/show', settings)
            .then(res => res.json())
            .then((json) => json);        
               
        //loop inside the object full of properties
        Object.keys(getData).forEach((prop) => {                            
            // `prop` is the property name
            // `getData[prop]` is the property value
            
            //if image exists
            if(getData[prop].image) {
                //prepare the image for read as base64 string
                getData[prop].image = ("data:image/png;base64," + getData[prop].image[0].img);
            }                      
        });                
        
        //return the data fetched from the API endpoint
        return getData;
    } catch(err) {
        alert("An error has occured while fetching user properties!");
        throw new Error("An error has occured fetching user properties!");
    }
}

/**
 * The function will fetch message history from the RESTApi
 *
 * @name Get the message history
 * @returns {Object} all messages saved in the DB
 */
async function getHisotry() {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
    const meta = new Map(); 
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    //set new header in order to add the credentials
    let headers = new Headers(meta);
    
    try{
        const settings = { method: 'get', withCredentials: true, credentials: 'include', headers: headers};

        //using node fetch to get the data from the API
        const getData = await fetch('https://program-nissan-3000.codio-box.uk/api/message/get', settings)
            .then(res => res.json())
            .then((json) => json);                                    
        
        //return the data fetched from the API endpoint
        return getData;
    } catch(err) {
        alert("An error has occured while fetching user properties!");
        throw new Error("An error has occured fetching user properties!");
    }
}

export default withRouter(Profile);
