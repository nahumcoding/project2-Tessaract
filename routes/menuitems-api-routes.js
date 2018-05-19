
var db = require("../models");
module.exports = function(app) {
// **********************************************************************************************************************
//                            GENERAL CONCEPT
// **********************************************************************************************************************

//INFO
// -api-routes.js - this file offers a set of routes for displaying and saving data to the db
// -This specific route is incharged of the ORDER PROCESSING APIs.

//'TWO ROUTES: 

// -The POST route will create the list of items on a given order. It will be saved with the orderID.
// -The GET route will look-up and bring back ALL the items on an specific order so it is display on a page accordingly. 

// **********************************************************************************************************************

// SPECIFIC NOTES ON MenuItems SQL DATA BASE
  //-The MenuItems is a table that requires the specific columns:
      //-itemDesc (this is provided by the client side on order submission)
      //-quantity (this is provided by the client side on order submission)
      //-total    (this is provided by the client side on order submission)
      //-OrderID  (this one is obtained from the Order submission - see notes of order-api-routes.js)

// Routes
// =============================================================
//{"{\"itemDesc\":\"Bacon Hulk Buster Deluxe Burger\",\"quantity\":1,\"total\":5,\"OrderId\":2}":""}


 app.post("/api/orderitems", function(req, res) {
    console.log("here");
    console.log(req.body);


    db.MenuItems.bulkCreate(req.body.order).then(function(dbreciept){
        res.json(dbreciept);
    });
 });

// SPECIFIC NOTES ON POST ROUTE
  //-The post is expecting AN ARRAY JSON OBJECTS. For Example:
  //-for one item only in an order:


    //[{
        //'key': 'value'
      //}] 

  //- for more than one item in an order:


//      [{
//          'key1': 'value1'
//      },
//      {
//          'key2': 'value2'
//      }] 


// EXAMPLE OF A POST:

//One ITEM:
// [{
//     "itemDesc": "Sub",
//     "quantity": 2,
//     "total": 10,
//     "OrderId": 1
//   }
//  ]

//MORE THAN ONE ITEM:
// [
//     {
//         "itemDesc": "Candy",
//         "quantity": 2,
//         "total": 10,
//         "OrderId": 1
//     },
//     {
//         "itemDesc": "Beer",
//         "quantity": 2,
//         "total": 10,
//         "OrderId": 1
//     }
// ]

// =============================================================
// =============================================================

  app.get("/api/reciept/:orderid", function(req, res){
    db.MenuItems.findAll({
      where: {
          OrderId: req.params.orderid
        }
      }).then(function(dbreciept) {
            res.json(dbreciept);
        });
  });

}

// SPECIFIC NOTES ON GET ROUTE
  //-The get is expecting the orderID to be dynamically passed on the path of the route. 

  //For Example:
    //-/api/reciept/2

  //*Where "/api/reciept" + "2" populated dynamically by the client once the ORDERID is recieved from the order submission API. see order-api-route.js for info.

//-This route will go an get ALL the items on a given orderID. And will return them all to the client. 
//AN example of the response, once again is an ARRAY of JSON OBJECTS:

// [
//     {
//         "id": 1,
//         "itemDesc": "Soda",
//         "quantity": 2,
//         "total": 10,
//         "createdAt": "2018-05-13T02:23:23.000Z",
//         "updatedAt": "2018-05-13T02:23:23.000Z",
//         "OrderId": 1
//     },
//     {
//         "id": 2,
//         "itemDesc": "burger",
//         "quantity": 2,
//         "total": 10,
//         "createdAt": "2018-05-13T02:23:28.000Z",
//         "updatedAt": "2018-05-13T02:23:28.000Z",
//         "OrderId": 1
//     }
// ]
//'ONLY IF WE CAN GET TO THIS:'
//-This API accounts only if the client side is responsible of rendering the contents of the reciept...
//- in other words, the client side still needs to calculate the total of the order by summing all the "total" of each Menu item.
//...However, this needs to be expanded to be render thru HANDLE BARS.

