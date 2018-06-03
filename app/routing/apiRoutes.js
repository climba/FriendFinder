var express = require("express");
var app = express.Router();
var path = require("path");


var friends = require("../data/friends.js");

// API Routes
// =============================================================

// Displays all friends
app.get("/friends", function(req, res) {
  console.log("API friends hit");
  return res.json(friends);
});

app.get("/app/public/images/best_friends.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/images/best_friends.jpg"));
});

app.get("/app/public/images/donna.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/images/donna.jpg"));
});

app.get("/app/public/images/dwane.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/images/dwane.jpg"));
});

app.get("/app/public/images/kiki.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/images/kiki.jpg"));
});

app.get("/app/public/images/mike.gif", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/images/mike.gif"));
});

app.get("/app/public/images/mira.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "../app/public/images/mira.jpg"));
});





app.get("/friends/:myFriends" , function(req, res) {
  var chosen = req.params.myFriends;

  console.log(chosen);
  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);

});

// Create New friends - takes in JSON input
app.post("/friends", function(req, res) {


  // We will use this object to hold the "best match". We will constantly update it as we
  // loop through all of the options
  var bestMatch = {
    name: "",
    photo: "",
    friendDifference: Infinity
  };
  

  // Here we take the result of the user"s survey POST and parse it.
  var userData = req.body;
  var userScores = userData.scores;

  // This variable will calculate the difference between the user"s scores and the scores of
  // each user in the database
  var totalDifference;

  // Here we loop through all the friend possibilities in the database.
  for (var i = 0; i < friends.length; i++) {
    var currentFriend = friends[i];
    totalDifference = 0;

    console.log(currentFriend.name);

    // We then loop through all the scores of each friend
    for (var j = 0; j < currentFriend.scores.length; j++) {
      var currentFriendScore = currentFriend.scores[j];
      var currentUserScore = userScores[j];

      // We calculate the difference between the scores and sum them into the totalDifference
      totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
    }

    // If the sum of differences is less then the differences of the current "best match"
    if (totalDifference <= bestMatch.friendDifference) {
      // Reset the bestMatch to be the new friend.
      bestMatch.name = currentFriend.name;
      bestMatch.photo = currentFriend.photo;
      bestMatch.friendDifference = totalDifference;
    }
  }

  // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
  // the database will always return that the user is the user's best friend).
  friends.push(userData);

  // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
  return res.json(bestMatch);

  
});

module.exports = app;