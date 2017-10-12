// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.redirect('https://fcc-request-header-parser-dsantamaria.glitch.me/api/whoami');
});

app.get('/api/whoami', (request, response) => {
  console.log(request.headers);
  //console.log(request.connection);
  var result = {
      //ipaddress: request.connection.remoteAddress,
      ipaddress: request.connection.remoteAddress.split(':').reverse()[0],
      language: request.headers["accept-language"].split(',')[0],
      software: parseOSInfo(request.headers["user-agent"])
  };
  console.log (result);
  
  response.status(200);
  response.send(result);
});

  function parseOSInfo(userAgent) {
    var osInfo = userAgent.split(/[\(\)]/)[1];
    return osInfo.trim();
  }

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
