    var express  = require('express');
    var app      = express();                                     
    var bodyParser = require('body-parser');    
    var request = require('request-json');
    var client = request.createClient('http://localhost:8080/');
    client.headers['Accept'] = 'application/json';

    app.use(express.static(__dirname + '/public'));                 
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

    function handleError(res, reason, message, code) {
      console.log("ERROR: " + reason);
      res.status(code || 500).json({"error": message});
    }

    app.get("/search/:term", function(req, res) {
        var term = req.params.term;
        var staticQueryString = '&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeatureStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US';
        client.get('http://api-3283.iheart.com/api/v1/catalog/searchAll?keywords=' + term + staticQueryString, function(err, data, body) {
            if(err) {
                handleError(res, err.message, "Failed to get catalog.");
            }
            res.json(data);
        });
       
    });

    app.listen(8080);
    console.log("App listening on port 8080");

    app.get('/', function (req, res) {
     res.sendFile(__dirname + '/public/index.html'); 
    });