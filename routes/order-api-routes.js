var db = require("../models");
module.exports = function(app) {
// **********************************************************************************************************************
//                            GENERAL CONCEPT
// **********************************************************************************************************************

//INFO
// -api-routes.js - this file offers a set of routes for saving data to the db
// -This specific route is incharged of the ORDER submission API.
// - AN ORDER is submitted to its own Orders table, this is exclusively for easy backend communication. 

//'One ROUTES: 

// -The POST route will create the Order submitted by the waitress. It will be saved with with the OrderName provided by the waitress.
// - It will return an echo but with the Order Id //(* PLEASE NOTE2)
// **********************************************************************************************************************

// SPECIFIC NOTES ON Orders SQL DATA BASE
  //-The Orders is a table that requires the specific columns:
      //-OrderName  (this is provided by the client side on order submission)
      //-WaitressId (this is provided by from the local storage after authentication. For more info See waitress-api-routes.js)
      //-waitress   (this is provided by from the local storage after authentication. Same value as above. For more info See waitress-api-routes.js)

// Routes
// =============================================================
    app.post("/api/order", function(req, res) {
    db.Orders.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
};

// SPECIFIC NOTES ON POST ROUTE
  //-This will be the first POST that the ORDER PAGE will call after submission. PlEASE NOTE THAT THE CLIENT SHOULD NOT ACCEPT AN EMPTY ORDER. 
  //-This post route will create an ORDER in the 'Orders' table. Saving it the WaitressID and the waitress values on the DATABASE. These IDs are different than the authenticated method. This ID also needs to be saved on the authentication (For more info See waitress-api-routes.js).
  //LOCAL STORAGE SHOUOLD HAVE "USERNAME": "VALID_CODE_USED_BY_USER" and "waitressid": "id(* PLEASE NOTE1)" that came back from the DB"

  //-Only one order at a time is to be submitted. It is expecting a JSON OBJECT like the following:

  //            {
  //             "OrderName": "Second Table",
  //             "WaitressId": 1,//(* PLEASE NOTE1) 
  //             "waitress": 1//(* PLEASE NOTE1) 
  //            }

//SPECIFIC NOTES ON THE RESPONSE:
  //This route will return the following as an EXAMPLE:

//   {
//     "id": 1,//(* PLEASE NOTE2)
//     "OrderName": "Second Table",
//     "WaitressId": 1,
//     "waitress": 1,
//     "updatedAt": "2018-05-13T15:49:49.132Z",
//     "createdAt": "2018-05-13T15:49:49.132Z"
// }

//'KEEP IN MIND WHEN CONSTRUCTING THE AJAX to handle of the response'
// THE CLIENT needs to consume the "id" //(* PLEASE NOTE2) property that comes back, and subsequentaly call the API to process the menu items of the order. For details see: menuitem-api-routes.js
// This can be achieved by calling another POST from the ""SUCCESS"" method of the AJAX post of the "/api/order". Very important to happen after because you need the ORDER ID//(* PLEASE NOTE2) that comes back and pass that on the path dynamically.
// IN OTHER WORDS, the steps:
//1) POST THE ORDER
//2) ON SUCCESS GET THE ID//(* PLEASE NOTE2) FROM THE ORDERS TABLE  
//3) PASS THE ORDER ID//(* PLEASE NOTE2) SUBSEQUENTLY TO "/api/reciept/:orderid"




