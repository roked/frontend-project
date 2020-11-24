/**
 * @module Components/home
 * @description Home page function component
 * @author Mitko Donchev
 */
import React, {
    useState,
    useEffect
} from 'react';
import {withRouter} from "react-router";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'node-fetch';
import base64 from 'base-64';

/**
 * Define the home page function component which show all properties
 *
 * @name Home page
 * @param {Object} props
 * @returns {DOMRect} the jsx code which represents the home page
 */
const Home = (props) => {
    //get the user from the props state
    const user = getUser(props);
    //check for user (if logged in)
    const [isLoggedIn] = useState(!!user);
    //store the state of the properties data
    const [data, setData] = useState([]);
    //store the filtered data
    const [finaldata, setFinalData] = useState([]);
    //store the properties which will be displayed
    const [dataFilter, setFilter] = useState([]);

    //truncate the description
    function Truncate(props) {
        //the max length of a description
        const maxLength = 100;
        return <Card.Text> {props.name.length > maxLength ? props.name.substring(0, maxLength) + "..." : props.name} </Card.Text>;
    }

    //set features variables which state will be checked
    const [features, setFeatures] = useState();
    const [garden, setGarden] = useState(false);
    const [balcony, setBalc] = useState(false);
    const [pool, setPool] = useState(false);
    const [barbeque, setBarb] = useState(false);
    const [gym, setGym] = useState(false);
    //store the alert
    const [alert, setAlert] = useState();

    //lifecycle method
    //useEffect is called immediately after the component is mounted to the DOM
    useEffect(() => {
        let alertMessage;
        //set the filters
        const feat = {
            garden: garden,
            balcony: balcony,
            pool: pool,
            barbeque: barbeque,
            gym: gym
        }
        //set the features (object.value() return an array)
        setFeatures(Object.values(feat));

        async function fetchData() {
            //send HTTP request
            const result = await getProperties();
            if (result.status === 200) {
                //set the state for the persistent data
                setData(result.properties);
                //if the filter data is empty
                if (dataFilter.length === 0) {
                    setFilter(result.properties);
                }
            } else {
                alertMessage =
                    <Alert variant="warning">
                        <Alert.Heading>{result.message}</Alert.Heading>
                    </Alert>
                setAlert(alertMessage);
            }
        }

        //call the function
        fetchData();

        //if filters were applied
        if (finaldata.length !== 0) {
            //if filters do not match any property
            if (finaldata[0] === 'string') {
                setFilter([]);
            } else {
                //if final data changes
                setFilter(finaldata);
            }
        }

    }, [garden, balcony, pool, barbeque, gym, finaldata, dataFilter.length]);

    //visitProperty is called whenever a property is selected
    const visitProperty = (propertyId) => {
        try {
            //redirect to property
            props.history.push({
                pathname: '/property/' + propertyId,
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };

    //create new property route
    const createNewProperty = () => {
        try {
            //redirect to property
            props.history.push({
                pathname: '/property/new',
                state: {user: user}
            });
        } catch (err) {
            console.log(err);
        }
    };

    //set the sell button
    let sellButton;
    if (isLoggedIn) {
        sellButton = <Button onClick={() => createNewProperty()} variant="info">Sell Now!</Button>
    }

    //apply filters
    const applyFilters = () => {
        //if no filters were applied
        if (features.every((val, index) => !val)) {
            setFinalData([])
            setFilter(data);
            return;
        }
        //array to store the properties after filtering
        const finalData = [];
        for (const property of data) {
            const propertyFeat = property.features;
            //check which properties match the filter
            if (Array.isArray(propertyFeat) && Array.isArray(features) &&
                propertyFeat.length === features.length &&
                propertyFeat.every((val, index) => val === features[index])) {
                //if match
                finalData.push(property);
            }
        }
        //in case no matches are found
        if (finalData.length === 0) {
            //set the data to be a an array with a string
            setFinalData(["string"])
            return;
        }
        //set the data with filters
        setFinalData(finalData)
    };

    return (
        <div className="container">
            {alert}
            <div className="my-2">
                <h1 className="pageTitle">Our active listings!</h1>
                {sellButton}
            </div>
            <div className="my-2 filters">
                <div className="checkBox">
                    <h3>Filters</h3>
                    <Form.Check className="centerCheckbox" name="garden" label="Beautiful garden"
                                onChange={e => setGarden(e.target.checked)}/>
                    <Form.Check className="centerCheckbox" name="barbeque" label="Barbeque"
                                onChange={e => setBalc(e.target.checked)}/>
                    <Form.Check className="centerCheckbox" name="pool" label="Pool"
                                onChange={e => setPool(e.target.checked)}/>
                    <Form.Check className="centerCheckbox" name="balcony" label="Balcony"
                                onChange={e => setBarb(e.target.checked)}/>
                    <Form.Check className="centerCheckbox" name="gym" label="Gym"
                                onChange={e => setGym(e.target.checked)}/>
                    <Button className="round" onClick={() => applyFilters()} variant="success">Filter</Button>
                </div>
            </div>
            <CardDeck>
                <div className="row">
                    {dataFilter.map((item, index) =>
                        <div className="col-sm-4" key={index}>
                            <Card className="mb-3 homeCard">
                                <Card.Img variant="top" src={item.image}/>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Truncate name={item.description}/>
                                </Card.Body>
                                <Card.Footer>
                                    <big className="text-muted">Price: {item.price}</big>
                                    <Button onClick={() => visitProperty(item._id)} variant="info">More Info</Button>
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
    //get the mata and set the headers
    const meta = setMetaForHeaders();
    const headers = new Headers(meta);
    try {
        const settings = {method: 'post', withCredentials: true, credentials: 'include', headers: headers};
        //using node fetch to get the data from the API
        const result = await fetch('https://program-nissan-3000.codio-box.uk/api/property/show', settings)
            .then(response =>
                response.json().then(data => ({
                        properties: data.properties,
                        message: data.message,
                        status: response.status
                    })
                ).then(res => res));
        if (result.status === 200) {
            const allProperties = result.properties;
            //loop inside the object full of properties
            Object.keys(allProperties).forEach((prop) => {
                // `prop` is the property name
                // `getData[prop]` is the property value

                //if image exists
                if (allProperties[prop].image) {
                    //prepare the image for read as base64 string
                    result.properties[prop].image = ("data:image/png;base64," + allProperties[prop].image[0].img);
                }
            });
        }

        //return the response
        return result;
    } catch (err) {
        console.log(err);
    }
}

/**
 * The function will get the current user if one.
 *
 * @name Get user
 * @param {Object} props - the react props
 * @returns {Object} the current user info
 * @returns {Boolean} false - if no user
 */
function getUser(props) {
    let user;
    if (props.location.state) {
        user = props.location.state.user;
    } else {
        user = false;
    }
    return user;
}

/**
 * The function will get the mata for the headers.
 *
 * @name Get meta
 * @returns {Map} meta - a map of key values
 */
function setMetaForHeaders() {
    //get the username and password from env variables
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;

    const meta = new Map();
    //set the content type
    meta.set('Content-Type', 'application/json');
    //auth credentials to access the backend API
    meta.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    //set new header in order to add the credentials and type
    return meta;
}

export default withRouter(Home);
