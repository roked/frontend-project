import React, { 
    useState, 
    useEffect }    from 'react';
import { 
    withRouter 
}                  from "react-router";
import Card        from 'react-bootstrap/Card';
import CardDeck    from 'react-bootstrap/CardDeck';
import Button      from 'react-bootstrap/Button';
import Form        from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import fetch       from 'node-fetch';
import base64      from 'base-64';


/**
 * Define the home page function component which show all properties
 *
 * @name Home page
 * @returns {JSX} the jsx code which represents the home page
 */
const Home = (props) => {
    //get the user from the props state
    let user;
    if(props.location.state){
        user = props.location.state.user;
    } else {
        user = false;
    }
    //check for user (if loged in)
    const [isLoggedIn , setUser] = useState(user ? true : false);    
    //store the state of the properties data
    const [data, setData] = useState([]);
    //truncate the description
    function Truncate(props){
        //the max lenght of a description
        const maxLenght = 100;
        return <Card.Text> {props.name.length > maxLenght ? props.name.substring(0, maxLenght) + "..." : props.name} </Card.Text>;
    }
    
    //lifecycle method
    //useEffect is called immediately after the component is mounted to the DOM
    useEffect(() => {
        async function fetchData() {
            // send HTTP request
            const result = await getProperties();
            // save response to variable
            setData(result);
        }          
        
        //call the function
        fetchData(); 
    }, []);    
    
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
    
    //create new property route 
    const createNewProperty = () => {  
        try{
             //redirect to property
             props.history.push({
                 pathname:'/property/new', 
                 state: { user: user }
             });
         } catch (err) {
             console.log(err);
         }   
    };  
    
    //set the sell button
    let sellButton;
    if(isLoggedIn){
        sellButton = <Button onClick={()=> createNewProperty()} variant="info">Sell Now!</Button>    
    }
    
    return(
        <div className="container">
            <div className="my-2">
                <h1 className="pageTitle">Our active listings!</h1>
                {sellButton}   
            </div>  
            <CardDeck>
                <div className="row">
                    {data.map(item =>
                      <div className="col-sm-4">
                      <Card className="mb-3 homeCard">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Truncate name={item.description}/>
                        </Card.Body>
                        <Card.Footer>
                          <big className="text-muted">Price: {item.price}</big>
                          <Button onClick={()=> visitProperty(item._id)} variant="info">More Info</Button>
                        </Card.Footer>
                      </Card>
                      </div>
                    )}
                </div>
            </CardDeck>
        </div>
    );
}

/**
 * The function will fetch all properties from the RESTApi
 *
 * @name Get the all properties
 * @returns {Object} all properties saved in the DB
 */
async function getProperties() {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    
    //set new header in order to add the credentials
    let headers = new Headers();
    
    //auth credentials to access the backend API
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    try{
        const settings = { method: 'post', withCredentials: true, credentials: 'include', headers: headers};

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
        alert("An error has occured while showAll!");
        throw new Error("An error has occured while showAll!");
    }
}

export default withRouter(Home);
