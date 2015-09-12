//ben
var fs = require('fs');
var http = require('http');
var url = require('url');
var port = 3000;
var server = http.createServer();
var sightingsDB = JSON.parse(fs.readFileSync('sightings2.json', 'utf8'));

server.on('request', function(request, response){
  var requestUrl = request.url;
  var urlObject = url.parse(requestUrl);
  var pathname = urlObject.pathname;
  var query = urlObject.query;
  console.log(urlObject);
  console.log(query);

  if (pathname === '/'){

      if(query){

      var query = query.split("=");

        if(query[0]==="l"){
          var locationArray = [];
          sightingsDB.forEach(function(sighting){
            if (sighting.location.toLowerCase() === query[1].toLowerCase().split('%20').join(", ")){
              locationArray.push(sighting);
            }
          });
          response.writeHead(200, {'Content-type': 'application/json'});
          response.write(JSON.stringify(locationArray));
          response.end();
        } else if (query[0]==="d"){
            var sightingsOccuredArray = [];
            sightingsDB.forEach(function(sighting){
            if (sighting.occurred.slice(0,8) === query[1] || sighting.occurred.slice(0,9) === query[1]){
             sightingsOccuredArray.push(sighting);
            }
          });
          response.writeHead(200, {'Content-type': 'application/json'});
          response.write(JSON.stringify(sightingsOccuredArray));
          response.end();
        } else if (query[0]==='s'){
            var shapesArray = [];
              sightingsDB.forEach(function(sighting){
              if (sighting.shape.toLowerCase() === query[1].toLowerCase()){
                shapesArray.push(sighting);
            }
          });
          response.writeHead(200, {'Content-type': 'application/json'});
          response.write(JSON.stringify(shapesArray));
          response.end();          
        } else if (query[0]==="id"){
          sightingsDB.forEach(function(sighting){
            if (sighting.id == parseInt(query[1])){
              response.writeHead(200, {'Content-type': 'application/json'});
              response.write(JSON.stringify(sighting));
              response.end(); 
            }    
          });
        }
     }
  } 
})

server.listen(port, function(){
  console.log('Yes, Iam listening on port', port);
})

