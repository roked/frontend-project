import React     from 'react';
import Card      from 'react-bootstrap/Card'
import CardDeck  from 'react-bootstrap/CardDeck'
import Button    from 'react-bootstrap/Button'

//define the home page component
//add card deck with cards
//TODO - use a loop and show all properties 
const Home = () => (
    <div className="container">
        <h1>Our active listings!</h1>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Property</Card.Title>
              <Card.Text>
                Here will be the property description.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
              <Button variant="info">More Info</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Property</Card.Title>
              <Card.Text>
                Here will be the property description.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
              <Button variant="info">More Info</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Property</Card.Title>
              <Card.Text>
                Here will be the property description.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
              <Button variant="info">More Info</Button>
            </Card.Footer>
          </Card>
        </CardDeck>
    </div>
);

export default Home;
