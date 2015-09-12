//dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
var ejs = require("ejs");
var app = express();
var request = require('request');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// app.locals.appdata = require('./data.json');
//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//functions
var readJSON = function readJSON(){
  myParsedData = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  return myParsedData;
}

var writeJSON = function writeJSON(json){
  var zipped = JSON.stringify(json);
  //write the file
  fs.writeFileSync("./data.json", zipped); 
}

//config
app.listen(3000, function() {
  console.log("I'm listening on 3000!");
});

//ROUTES


app.get('/pics', function(req, res){
    if(req.query.pics === undefined){

      alert("bad search! try again")
      res.redirect("/");

    } else {

      var tag = req.query.pics;
      var requestURL = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=";
        
      request.get(requestURL, function(err, response, body){
        var parsedJSON = JSON.parse(body);
        var myParsedData = parsedJSON;
        var html = fs.readFileSync("./views/new.ejs", "utf8");
        var rendered = ejs.render(html, {myParsedData: myParsedData});
        res.send(rendered);
      });  
      
    }
});

app.post("/pics", function(req, res){
  readJSON();
  var newPic = req.body;
  newPic.id = parseInt(myParsedData.counter) + 1;
  myParsedData.counter = parseInt(myParsedData.counter) + 1;
  myParsedData.pic.push(newPic);
  writeJSON(myParsedData);
  res.redirect("/");
});

app.get("/", function(req, res){
  var html = fs.readFileSync("./views/index.ejs", "utf8");
  // myParsedData = readJSON();
  // console.log(myParsedData);
  var string = fs.readFileSync("./data.json", "utf8");
  var parsed = JSON.parse(string);
  // var parsedJSON = JSON.parse(myParsedData);
  var rendered = ejs.render(html, {myParsedData: parsed});
  res.send(rendered);
});

app.delete("/pics/:id", function(req, res) {
  myParsedData = readJSON();
  myParsedData.pic.forEach(function(pic,index,array) {
    if (pic.id == req.params.id){
      var index = myParsedData.pic.indexOf(pic);
      myParsedData.pic.splice(index,1);
      writeJSON(myParsedData);
      res.redirect("/");
    }
  });
});

