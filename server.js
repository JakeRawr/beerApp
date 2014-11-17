'use strict';

var express = require('express');
var app = express();
var request = require('superagent');
var port = process.env.PORT || 3000;
var bodyparser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.post('/getTemp', function (req,res) {
  var wunderUrl = 'http://api.wunderground.com/api/' +
    '2f27d3d3a5447b99'+
    '/conditions/q/' +
    req.body.latitude +
    ',' + req.body.longitude +
    '.json';

    request
    .get(wunderUrl)
    .end(function (err, wunderData) {
        var parsedData = JSON.parse(wunderData.text);
        res.json({currentCity: parsedData.current_observation.display_location.full,
                  temp: parsedData.current_observation.temp_f});
    });
});

app.listen(port, function (){
  console.log('Server started at port: ' + port);
});

