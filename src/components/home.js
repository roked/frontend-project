import React, { useState, useEffect }     from 'react';
import Card      from 'react-bootstrap/Card';
import CardDeck  from 'react-bootstrap/CardDeck';
import Button    from 'react-bootstrap/Button';
import fetch     from 'node-fetch';
import base64    from 'base-64';

//define the home page function component
//add card deck with cards
//TODO - use a loop and show all properties 
//TODO - make sure more info shows the currect property
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
            // save response to variable
            setData(result);
        }   
        fetchData();    
    }, []);    
    
    return(
        <div className="container">
            
     <ul>
       {data.map(item => <li key={item}>{item}</li>)}
     </ul>

            
            
            <div className="my-2">
                <h1 className="pageTitle">Our active listings!</h1>
                <Button href="/property/new" variant="info">Sell Now!</Button>                
            </div>
            <CardDeck>
              <Card>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1570076146047-06848c7b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Property</Card.Title>
                  <Truncate name=
                   "Fusce sollicitudin, libero id gravida placerat, augue nibh ornare augue, in ultrices magna tellus nec odio. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nunc aliquam ante vel posuere tincidunt. 
                    Morbi ullamcorper mi eget est varius, in sagittis sem tincidunt. In eu fermentum neque."/>
                </Card.Body>
                <Card.Footer>
                  <big className="text-muted">Price: £30000</big>
                  <Button href="/property" variant="info">More Info</Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1570076146047-06848c7b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Property</Card.Title>
                  <Card.Text>
                    Here will be the property description.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <big className="text-muted">Price: £30000</big>
                  <Button href="/property" variant="info">More Info</Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1570076146047-06848c7b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" />
                <Card.Body>
                  <Card.Title>Property</Card.Title>
                  <Card.Text>
                    Here will be the property description.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <big className="text-muted">Price: £30000</big>
                  <Button href="/property" variant="info">More Info</Button>
                </Card.Footer>
              </Card>
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
    const username = "donchevm@coventry.ac.uk";
    const password = "Kvadratura44!"
    
    let headers = new Headers();

    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    try{
        const settings = { method: 'Get' , headers: headers};

        const getData = await fetch('https://program-nissan-3000.codio-box.uk/api/property/show', settings)
            .then(res => console.log(res))
            .then((json) => json);

        return getData;
    } catch(err) {
        console.log(err);
    }
}

export default Home;
