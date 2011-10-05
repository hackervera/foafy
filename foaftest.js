var express = require("express");
var app = express.createServer();
var host = process.env.FOAFHOST;

app.get('/verify', function(req, res){
 //console.log(req.url);

 console.log(host+req.url);
 var verifier = new require("./foaf-verify").FoafVerifier(host+req.url);
  
  
  console.log(verifier.verify());
  res.send("YO");
});


app.get('/login', function(req, res){
  var redirect = "https://foafssl.org/srv/idp?authreqissuer="+host+"/verify";
  console.log(redirect);
  res.redirect(redirect);
});
  

app.listen(3000);
