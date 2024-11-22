const express = require("express");
const app = express ();
const https=require("https");
const bodyParser = require("body-parser");
const { url } = require("inspector");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/" , function(req , res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/",function (req,res){
    const query = req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+",india&appid=5ff7470741a20717bd1966144794909b&units=metric#"

    https.get(url,function(response){
        console.log(response.statusCode);
       
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            if(!weatherData.main)res.sendFile(__dirname+"/error.html")
            else{
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.write("<P>The weather is currently "+weatherDescription+"</p>");
                res.write("<h1> The temperature in "+query+" is "+temp+" </h1> ");
                
                res.write("<img src ="+imageURL+">");
                res.send()
            }
            
           

        })
    })
})
   
app.listen(3000,function (){
    console.log("server is running in port 3000");
})