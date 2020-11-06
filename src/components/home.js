import React, { 
    useState, 
    useEffect }  from 'react';
import Card      from 'react-bootstrap/Card';
import CardDeck  from 'react-bootstrap/CardDeck';
import Button    from 'react-bootstrap/Button';
import fetch     from 'node-fetch';
import base64    from 'base-64';

/**
 * Define the home page function component which show all properties
 *
 * @name Home page
 * @returns {JSX} the jsx code which represents the home page
 */
const Home = () => {
    //using react hook function useState to controll the state
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
            
            console.log(result)
            // save response to variable
            setData(result);
        }          
        
        //call the function
        fetchData(); 
    }, []);    
    
    return(
        <div className="container">
            <div className="my-2">
                <h1 className="pageTitle">Our active listings!</h1>
                <Button href="/property/new" variant="info">Sell Now!</Button>                
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
                          <Button href={"/property/" + item._id} variant="info">More Info</Button>
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
 * @returns {Object} all active properties saved in the DB
 */
async function getProperties(setPreviewImg) {
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
        console.log(err);
    }
}

export default Home;
