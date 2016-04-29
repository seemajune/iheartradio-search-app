    var express  = require('express');
    var app      = express();                                     
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var request = require('request-json');
    var client = request.createClient('http://localhost:8080/');
    client.headers['Accept'] = 'application/json';

    // configuration =================

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

    // Generic error handler used by all endpoints.
    function handleError(res, reason, message, code) {
      console.log("ERROR: " + reason);
      res.status(code || 500).json({"error": message});
    }

    app.get("/search/:term", function(req, res) {
        console.log('req.params = ', req.params);
        var term = req.params.term;
        var staticQueryString = '&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeatureStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US';
        client.get('http://api-3283.iheart.com/api/v1/catalog/searchAll?keywords=' + term + staticQueryString, function(err, data, body) {
            console.log(data);
            if(err) {
                handleError(res, err.message, "Failed to get catalog.");
            }
            res.json(data);
        });
       
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

    app.get('/', function (req, res) {
     res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });