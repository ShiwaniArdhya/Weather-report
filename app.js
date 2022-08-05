const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
  const query = req.body.CityName;
  const apikey ="aac8f4ef923124f85e7e6f5c9bd16a53";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apikey + "&units=" + unit;

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherdescription + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
      res.write("<img src =" + imageURL + ">");
      res.send();
    })

  })
})


app.listen(5000,function(){
  console.log("server is running on port 5000. ");
});
