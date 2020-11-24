# Frontend Client 304cem

#### Single Page Application project with React for front end and NodeJS for backend. 

You can run the project by first cd in the right directory (frontendcode304cem) and use 

```javascript
npm start
```

# Mandatory dependencies:

You must run:
```javascript
npm i
```

```javascript
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "base-64": "^1.0.0",
    "bootstrap": "^4.5.3",
    "jsdoc": "^3.6.6",
    "koa": "^2.13.0",
    "koa-logger": "^3.2.1",
    "koa-mount": "^4.0.0",
    "koa-static": "^5.0.0",
    "node-fetch": "^2.6.1",
    "react": "^16.14.0",
    "react-bootstrap": "^1.4.0",
    "react-chat-elements": "^10.12.0",
    "react-chatbox-component": "0.0.5",
    "react-dom": "^16.14.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "^4.0.0",
    "react-transition-group": "^4.4.1",
    "socket.io": "^3.0.1",
    "socket.io-client": "^3.0.1",
    "web-vitals": "^0.2.4"
```

#### Node version during developement is v12.18.3.

### Don't forget to check for 
```javascript
  "type": "module",
``` 
inside the package.json file in order to use ES6

# Available pages

 ##### User
 * Login
 * Registration
 * Profile
 
 ##### Property
 * Home
 * Property

# Features 

1. The website allows the user to see a list of properties listed for sale. 

2. Every user can see more information about a single property and send a private message to the owner.

3. After registration the user can create a new property and add description, price, location etc.

4. The user can edit, delete and archive a property sold by them.

5. Every user can apply filters on the home page to sort the properties.

6. A logged in user can access their profile page and check the properties they own and messages from other users/guest.

7. Filtering properties is also available under profile page.

# OpenAPI and JSDoc documentation is available

If you want to check the OpenAPI and JSDoc (with schemas) you have to run:

```javascript
   node docs.js
``` 
