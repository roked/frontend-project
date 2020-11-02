import React         from 'react';
import Card          from 'react-bootstrap/Card';
import Button        from 'react-bootstrap/Button';
import ListGroup     from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { useParams } from "react-router-dom";


//define the property page function component
//add card which will hold the information
const Property = (props) => {
    
    //get the property id from the params using react hook
    const { id } = useParams();
    
    return(
        <div className="container">
            <h1 className="pageTitle">We hope you like it!</h1>
            <Card>
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1570076146047-06848c7b8226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" />
              <Card.Body>
                <Card.Title id="cardTitle">Property with id {id}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Category: </ListGroupItem>
                <ListGroupItem>Description: Fusce sollicitudin, libero id gravida placerat, augue nibh ornare augue, in ultrices magna tellus nec odio. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nunc aliquam ante vel posuere tincidunt. 
                Morbi ullamcorper mi eget est varius, in sagittis sem tincidunt. In eu fermentum neque. </ListGroupItem>
                <ListGroupItem>Features: 
                    <ListGroup className="list-group-flush">
                        <ListGroupItem> * Fusce sollicitudin</ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
                <ListGroupItem>Location: </ListGroupItem>
                </ListGroup>    
              <Card.Footer>
                <big className="text-muted">Price: £30000</big>
                <Button href="/property/edit/" variant="warning">Edit Property</Button>
                <Button variant="info">Contact Seller</Button>
              </Card.Footer>
            </Card>
        </div>
    );
}
export default Property;
