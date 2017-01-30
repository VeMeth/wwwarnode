var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var wwparse = require('../ww-parse.js')

/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/games/:gamename', function(req, res, next){

  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/wwarchive';

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);
    var game = req.params.gamename
    // Get the documents collection
    var collection = db.collection('fullarchive');
    //console.log('Finding replay for', res.params.gamename);
    // Find all students
    collection.find({"GameId": game}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        var onGameLoaded = function () {
            console.log('Starting to load JSON...');
        };

        // The Promise has "Fullfilled" the request
        var onGameCreated = function (result) {

            // Response should be passed in by promise
            console.log('Rendering page...');

            res.render('playerlist',{

          // Pass the returned database documents to Jade
          "eventlist" : result
        });
        }

        // The Promise has "Rejected" the request
        var onFailure = function (error) {
            console.log('FAILUREEEEEE');
            //response.render('error');
        };
        // Kick off the game parsing

        var promise = new Promise(function (resolve, reject) {
            console.log('Creating game...');
            var game = wwparse.creategame(result, resolve, reject);
            console.log('Created game...');
            console.log('Game = ', game);
        });

        promise.then(onGameCreated, onFailure).catch(onFailure);


      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});


module.exports = router;
