import React     from 'react';
import Card      from 'react-bootstrap/Card';
import CardDeck  from 'react-bootstrap/CardDeck';
import Button    from 'react-bootstrap/Button';

//define the home page component
//add card deck with cards
//TODO - use a loop and show all properties 
//TODO - make sure more info shows the currect property
const Home = () => {
    //truncate the description
    function Truncate(props){
        //the max lenght of a description
        const maxLenght = 100;
        return <Card.Text> {props.name.length > maxLenght ? props.name.substring(0, maxLenght) + "..." : props.name} </Card.Text>;
    }
    
    return(
        <div className="container">
            <h1 className="pageTitle">Our active listings!</h1>
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

export default Home;
