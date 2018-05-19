// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
// Route to the main.html page
app.get("/main", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/main.html"));
});
// Route to the r.html page
app.get("/receipt", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/invoice.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});


  
}
