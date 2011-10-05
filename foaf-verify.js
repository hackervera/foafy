var crypto = require("crypto");
var fs = require("fs");

var cert = fs.readFileSync('foafssl.crt', 'ascii');

var FoafVerifier = function(urlString){
  var self = this;
  self.verifier = crypto.createVerify("RSA-SHA1");
  self.url = urlString.replace(/\&sig.*/,"");
  self.verifier.update(self.url);
  
  var sig = urlString.match(/sig\=(.*?)*/gi)[0].split("=")[1];
  self.signature = sig.replace(/\-/g,"+").replace(/\_/g,"/");
  self.hexData = new Buffer(self.signature, 'base64').toString('hex');
  
  self.verify = function(){
    var self = this;
    console.log(cert);
    console.log(self.hexData);
    console.log(self.url);
    return self.verifier.verify(cert, self.hexData, 'hex');
  }

  return self;
}



exports.FoafVerifier = FoafVerifier;

/******************
** Example usage **
console.log(new FoafVerifier("http://localhost/webid.html?webid=http%3A%2F%2Fwebid.fcns.eu%2Fpeople%2Ftylergillies%2Fcard%23me&ts=2011-10-04T01%3A13%3A21-0700&sig=TslLuSZqG4TmsD4mDwoVvwUYAqnQAoveZmp5gAeKkArWpQ9zcM7VjHsChL5SBpoTP-viVR2-VjZ4EA1ODB6bJXD80gSavkx6qNNfmiCU-ZAHq4lTurDiyiV1n6holVUziSEo--ozjxJ0nuC-O0PlW5GJ1IymakSgEpYVMyFtWd_Ev7kN7v4sy91tfdFDjJTlKP36Rtx9kElrRyiQVE0thH4WHLYrZYRKnFsBUg9_7EyINytyGmgCEXi5i3zUKwG0vJw3MTRXAnWcLu5e6IC3e6YCYnEcmEr2loXx04TTHoIMDmFBVnZ_GjuYJNl_dMozyxWbZB3pQjyioY3wNfUo4g").verify());
*/

