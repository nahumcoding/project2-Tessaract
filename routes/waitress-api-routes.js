var db = require("../models");
module.exports = function(app) {
// **********************************************************************************************************************
//                            GENERAL CONCEPT
// **********************************************************************************************************************

//INFO
// -api-routes.js - this file offers a set of routes for displaying and saving data to the db
// -This specific route is incharged of the ORDER PROCESSING APIs.

//'TWO ROUTES: 

// -The POST route will create a waitress. We need a UI for this, but for now create using POSTMAN. This is the first thing that must exist.
// -The GET route will look-up and bring back the specific user trying to log in, if it doesn't come back or null then error advising the user to re-enter If it comes back, then read below. 

// **********************************************************************************************************************

// SPECIFIC NOTES ON Waitress SQL DATA BASE
  //-The Waitress is a table that requires the specific columns:
      //-waitressID  (this is provided by the client side on order submission)

// Routes
// =============================================================

//'FIRST YOU NEED TO CREATE A NEW WAITRESS OF YOUR CHOICE, We need a UI before we deploy, but for wiring everything up, just use Post man' 
//To create just send a JSON similar to the following, it can be your phone number:
// {
//     "waitressID": "30455556623434"
//   }
//Note: the waitressID above is the user name that the waitress will need to input on the to login. 

   app.post("/api/waitress", function(req, res) {
    db.Waitress.create(req.body).then(function(dbwaitress) {
      res.json(dbwaitress);
    });
  });

//'GET ROUTE:'
//'The userID is passed dynamically as part of the url path of the AJAX get request on the client side'
 app.get("/api/waitress/auth/:userid", function(req, res){
    db.Waitress.findOne({
      where: {
        waitressID: req.params.userid
      }
    }).then(function(dbwaitress){
      res.json(dbwaitress);
    });
 });
};
// SPECIFIC NOTES ON RESPONSE 
//'On the response you will get the following as an example:
// {
//     "id": 1,
//     "waitressID": "30455556623434",
//     "updatedAt": "2018-05-13T17:26:03.192Z",
//     "createdAt": "2018-05-13T17:26:03.192Z"
// }
//The client needs to grab the "waitressID" and store it in local browser storage. As well as the "id". 
//You will use the waitressID to check the local storage against it on all pages (except login page). If its not there, redirect the user to login page. Store it for the session only.
//You will use the id to post the Order on "order-api-route.js" for path /api/order. 

